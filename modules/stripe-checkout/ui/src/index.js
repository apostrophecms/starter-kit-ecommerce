export default () => {
  // Initialize Stripe when the page loads
  let stripe;

  const initStripe = () => {
    if (window.stripePublishableKey) {
      stripe = window.Stripe(window.stripePublishableKey);
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

    // Get data attributes properly
    const productId = button.dataset.productId;
    const price = button.dataset.price;
    const name = button.dataset.name;
    const image = button.dataset.image;

    console.log('Checkout data:', { productId, price, name, image });

    // Show loading state
    button.disabled = true;
    const buttonSpan = button.querySelector('span');
    const originalText = buttonSpan ? buttonSpan.textContent : button.textContent;
    if (buttonSpan) {
      buttonSpan.textContent = 'Loading...';
    } else {
      button.textContent = 'Loading...';
    }

    try {
      // Call the public route instead of API route
      const response = await fetch('/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          price: parseFloat(price),
          name
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        button.disabled = false;
        if (buttonSpan) {
          buttonSpan.textContent = originalText;
        } else {
          button.textContent = originalText;
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      button.disabled = false;
      if (buttonSpan) {
        buttonSpan.textContent = originalText;
      } else {
        button.textContent = originalText;
      }
    }
  };

  // Initialize on page load
  apos.util.onReady(() => {
    console.log('Stripe checkout module loaded');
    initStripe();

    // Add click handlers to all Stripe checkout buttons
    document.addEventListener('click', (e) => {
      const button = e.target.closest('.stripe-checkout-button');
      if (button) {
        console.log('Stripe checkout button clicked');
        e.preventDefault();
        handleCheckout(button);
      }
    });
  });
};
