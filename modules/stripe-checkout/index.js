// ESM syntax for Stripe
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default {
  options: {
    alias: 'stripeCheckout'
  },
  init(self) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      self.stripe = new Stripe(secretKey);
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
  apiRoutes(self) {
    return {
      post: {
        async createCheckoutSession(req) {
          try {
            const {
              productId,
              price,
              name,
              image
            } = req.body;

            // Create Stripe checkout session
            const session = await stripe.checkout.sessions.create({
              payment_method_types: [ 'card' ],
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: name,
                      images: image ? [ image ] : []
                    },
                    unit_amount: Math.round(price * 100) // Convert to cents
                  },
                  quantity: 1
                }
              ],
              mode: 'payment',
              success_url: `${req.absoluteUrl}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${req.absoluteUrl}/products/${productId}`,
              metadata: {
                productId: productId
              }
            });

            return {
              sessionId: session.id
            };
          } catch (error) {
            console.error('Stripe error:', error);
            throw self.apos.error('invalid', 'Unable to create checkout session');
          }
        }
      }
    };
  }
};
