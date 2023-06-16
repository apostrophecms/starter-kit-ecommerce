/**
 * Toggle mobile navigation menu.
 */
export function toggle(element) {
  /** @type {HTMLElement | undefined} */
  const el = element;
  if (!el) {
    return;
  }
  const popup = document.querySelector(el.dataset.target);
  const nav = document.querySelector(`#${el.getAttribute('aria-controls')}`);
  const active = el.getAttribute('aria-expanded') === 'true';
  if (!popup || !nav) {
    return;
  }
  if (!active) {
    el.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    popup.classList.remove('pointer-events-none');
    popup.style = 'transform: translate(0, 0); opacity: 1;';
    return;
  }
  el.setAttribute('aria-expanded', 'false');
  nav.setAttribute('aria-hidden', 'true');
  popup.style = '';
  popup.classList.add('pointer-events-none');
}
