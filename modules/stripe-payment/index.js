import Stripe from 'stripe';

export default {
  options: {
    alias: 'stripePayment'
  },
  init(self) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      self.stripe = new Stripe(secretKey);
      console.log('Stripe initialized successfully');
    } else {
      console.warn('Warning: Stripe secret key not found. Stripe functionality will not work.');
    }
  },
  apiRoutes(self) {
    return {
      post: {
        // Create a Stripe checkout session
        async createCheckout(req) {
          try {
            if (!self.stripe) {
              throw new Error('Stripe not configured');
            }
            const { productId, price, name, image } = req.body;
            if (!productId || !price || !name) {
              return {
                status: 'error',
                message: 'Missing required fields',
                required: ['productId', 'price', 'name'],
                received: req.body
              };
            }
            // Use ApostropheCMS's built-in method to get the correct base URL
            // This handles locale-specific hostnames and configured baseUrl settings
            let baseUrl = self.apos.page.getBaseUrl(req);
            if (!baseUrl) {
              // Fallback: if no baseUrl is configured, construct from the request
              const protocol = req.protocol;
              const host = req.get('host');
              baseUrl = `${protocol}://${host}`;
            }
            // Process the image URL to make it absolute and valid for Stripe
            let processedImages = [];
            if (image && image.trim()) {
              let imageUrl = image.trim();
              // If it's a relative URL, make it absolute
              if (imageUrl.startsWith('/')) {
                imageUrl = baseUrl + imageUrl;
              }
              // Only include the image if it's a valid HTTP/HTTPS URL
              // Stripe requires publicly accessible URLs
              if (imageUrl.match(/^https?:\/\/.+/)) {
                // For local development, skip images since localhost URLs won't work with Stripe
                if (!imageUrl.includes('localhost') && !imageUrl.includes('127.0.0.1')) {
                  processedImages.push(imageUrl);
                }
              }
            }
            // Create the checkout session
            const session = await self.stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: name,
                      images: processedImages
                    },
                    unit_amount: Math.round(parseFloat(price) * 100)
                  },
                  quantity: 1
                }
              ],
              mode: 'payment',
              success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${baseUrl}/checkout/cancel`,
              metadata: {
                product_url: req.get('referer') || baseUrl
              }
            });
            return {
              url: session.url,
              sessionId: session.id
            };
          } catch (error) {
            console.error('Stripe error details:', error);
            return {
              status: 'error',
              message: error.message,
              details: error.stack
            };
          }
        }
      }
    };
  },
  routes(self) {
    return {
      // Handle the checkout success page
      get: {
        '/checkout/success': async (req, res) => {
          try {
            let sessionData = null;
            let error = null;
            // Check if we have a session_id from Stripe
            if (req.query.session_id) {
              try {
                // Retrieve the session from Stripe
                const session = await self.stripe.checkout.sessions.retrieve(req.query.session_id);
                // Extract relevant data for the template
                sessionData = {
                  id: session.id,
                  amount_total: session.amount_total,
                  currency: session.currency,
                  customer_email: session.customer_details?.email,
                  customer_name: session.customer_details?.name,
                  payment_status: session.payment_status,
                  // Format the date on the server side
                  created_date: new Date(session.created * 1000).toLocaleDateString(),
                  // Add referrer information from metadata
                  referrer_url: session.metadata?.referrer_url || '/',
                  product_url: session.metadata?.product_url || '/'
                };
                // Log successful payment for your records
                self.apos.util.log(`Payment successful: ${session.id} - ${session.amount_total / 100} ${session.currency.toUpperCase()}`);
              } catch (stripeError) {
                self.apos.util.error('Error retrieving Stripe session:', stripeError);
                error = 'Unable to retrieve payment information';
              }
            }
            await self.sendPage(req, 'success', {
              session: sessionData,
              error: error,
              hasSession: !!sessionData
            });
          } catch (error) {
            self.apos.util.error('Error rendering success page:', error);
            return res.status(500).send('error');
          }
        },

        '/checkout/cancel': async (req, res) => {
          try {
            await self.sendPage(req, 'cancel', {});
          } catch (error) {
            self.apos.util.error('Error rendering cancel page:', error);
            return res.status(500).send('error');
          }
        }
      }
    };
  }
};
