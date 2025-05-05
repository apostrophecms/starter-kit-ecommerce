// ESM syntax for Stripe
import Stripe from 'stripe';

export default {
  options: {
    alias: 'stripeCheckout'
  },
  
  init(self) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      self.stripe = new Stripe(secretKey);
      console.log('Stripe initialized successfully');
    } else {
      console.warn('Warning: Stripe secret key not found. Stripe functionality will not work.');
    }
    
    // Add Stripe publishable key to browser
    self.apos.template.append('body', 'stripe-checkout:scriptTags');
  },
  
  components(self) {
    return {
      scriptTags(req, data) {
        return {
          stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || self.options.publishableKey
        };
      }
    };
  },
  
  routes(self) {
    return {
      post: {
        '/stripe/create-checkout-session': async (req, res) => {
          console.log('Stripe checkout route hit');
          console.log('Request body:', req.body);
          
          try {
            if (!self.stripe) {
              return res.status(500).json({
                error: 'Stripe not configured'
              });
            }
            
            const { productId, price, name } = req.body;
            
            if (!productId || !price || !name) {
              return res.status(400).json({
                error: 'Missing required fields',
                required: ['productId', 'price', 'name'],
                received: req.body
              });
            }
            
            // Construct the base URL properly
            const protocol = req.protocol;
            const host = req.get('host');
            const baseUrl = `${protocol}://${host}`;
            
            console.log('Base URL:', baseUrl);
            
            // Create the checkout session
            const session = await self.stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: name
                    },
                    unit_amount: Math.round(parseFloat(price) * 100)
                  },
                  quantity: 1
                }
              ],
              mode: 'payment',
              success_url: `${baseUrl}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${baseUrl}/shop`
            });
            
            console.log('Checkout session created:', session.id);
            
            return res.json({
              sessionId: session.id
            });
          } catch (error) {
            console.error('Stripe error details:', error);
            return res.status(500).json({
              error: error.message,
              details: error.stack
            });
          }
        }
      }
    };
  }
};
