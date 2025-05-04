export default () => {
  // Initialize Stripe when the page loads
  let stripe;

  const initStripe = () => {
    if (window.stripePublishableKey) {
      stripe = Stripe(window.stripePublishableKey);
    } else {
      console.error('Stripe publishable key not found');
    }
  };

  // Handle checkout button clicks
  const handleCheckout = async (button) => {
    if (!stripe) {
      console.error('Stripe not initialized');
      return;
    }

    const { productId, price, name, image } = button.dataset;

    // Show loading state
    button.disabled = true;
    button.textContent = 'Loading...';

    try {
      // Create checkout session on your server
      const response = await fetch('/api/v1/stripe-checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          price: parseFloat(price),
          name,
          image
        })
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        console.error('Error:', error);
        button.disabled = false;
        button.textContent = 'Buy Now with Stripe';
      }
    } catch (error) {
      console.error('Error:', error);
      button.disabled = false;
      button.textContent = 'Buy Now with Stripe';
    }
  };

  // Initialize on page load
  apos.util.onReady(() => {
    console.log('Stripe checkout module loaded');
    initStripe();

    // Add click handlers to all Stripe checkout buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('stripe-checkout-button')) {
        console.log('Stripe checkout button clicked');
        e.preventDefault();
        handleCheckout(e.target);
      }
    });
  });
};
