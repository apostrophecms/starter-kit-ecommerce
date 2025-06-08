export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Checkout Page'
  },
  init(self) {
    // Add routes for success and cancel pages
    self.apos.app.get('/checkout/success', self.success);
    self.apos.app.get('/checkout/cancel', self.cancel);
  },
  methods(self) {
    return {
      // Success page handler
      async success(req, res) {
        // You can verify the session here if needed
        const sessionId = req.query.session_id;
        return self.render(req, 'success', {
          sessionId,
          title: 'Order Successful'
        });
      },
      // Cancel page handler
      async cancel(req, res) {
        return self.render(req, 'cancel', {
          title: 'Order Cancelled'
        });
      }
    };
  }
};