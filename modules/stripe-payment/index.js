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
            // Create the checkout session
            const session = await self.stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: name,
                      images: image ? [image] : []
                    },
                    unit_amount: Math.round(parseFloat(price) * 100)
                  },
                  quantity: 1
                }
              ],
              mode: 'payment',
              success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${baseUrl}/checkout/cancel`
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
  }
};