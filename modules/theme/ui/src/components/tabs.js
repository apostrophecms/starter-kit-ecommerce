/**
 * Switch tabbed content. It's used in Product View but
 * it's abstract enough to be used anywhere.
 */
let components = [];

function init() {
  cleanup();
  const tabs = document.querySelectorAll('[data-app-tabs]');
  tabs.forEach(root => {
    const buttons = root.querySelectorAll('[data-tab-target]');
    buttons.forEach((button) => {
      addListener(root, button, buttons);
    });
  });
}

function addListener(root, button, buttons) {
  const listener = (ev) => {
    const targetQuery = button.getAttribute('data-tab-target');
    const target = root.querySelector(`[data-tab-content="${targetQuery}"]`);
    if (target) {
      ev.preventDefault();
      // Active state.
      // NOTE: this can be done with a tailwind group state
      // in the future (see product gallery `is-active` class)
      buttons.forEach((button) => {
        button.classList.remove('border-b-2');
        button.classList.remove('border-brand');
        button.classList.remove('font-bold');
      });
      button.classList.add('border-b-2');
      button.classList.add('border-brand');
      button.classList.add('font-bold');

      // Show target.
      const targets = root.querySelectorAll('[data-tab-content]');
      targets.forEach((target) => {
        target.classList.add('hidden');
      });
      target.classList.remove('hidden');
    }
  };
  button.addEventListener('click', listener);
  components.push({
    destroy: () => button.removeEventListener('click', listener)
  });
}

function cleanup() {
  components.forEach(component => component.destroy());
  components = [];
}

export { init };
