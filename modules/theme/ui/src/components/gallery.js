/**
 * Gallery image player, used in Product View but
 * it's abstract enough to be used anywhere.
 */
let components = [];

function init() {
  cleanup();
  const galleries = document.querySelectorAll('[data-app-gallery]');
  galleries.forEach(gallery => {
    const player = gallery.querySelector('[data-player]');
    const thumbs = gallery.querySelectorAll('[data-thumbnail]');
    const triggers = gallery.querySelectorAll('[data-trigger]');
    thumbs.forEach((thumb, i) => {
      addTriggerListener(i, gallery, triggers, thumbs, player);
    });
  });
}

function addTriggerListener(i, gallery, triggers, thumbs, player) {
  const thumb = thumbs[i];
  const trigger = triggers[i];
  const current = gallery.querySelector('.is-active');

  const listener = (ev) => {
    ev.preventDefault();
    const src = thumb.getAttribute('src');
    const style = thumb.getAttribute('style');
    const alt = thumb.getAttribute('alt');
    const width = thumb.getAttribute('width');
    const height = thumb.getAttribute('height');
    const srcset = thumb.getAttribute('srcset');

    current?.classList.remove('is-active');

    player.setAttribute('src', src);
    player.setAttribute('style', style);
    player.setAttribute('alt', alt);
    player.setAttribute('width', width);
    player.setAttribute('height', height);
    player.setAttribute('srcset', srcset);
  };

  trigger.addEventListener('click', listener);
  components.push({
    destroy() {
      trigger.removeEventListener('click', listener);
    }
  });
}

function cleanup() {
  components.forEach(component => {
    component.destroy();
  });
  components = [];
}

export { init };
