import { toggle as mobileNavToggle } from './components/mobile-nav.js';
import { init as initGalleries } from './components/gallery.js';
import { init as initTabs } from './components/tabs.js';

export default () => {
  const theme = window.apos.modules.theme || {};

  // Components
  theme.mobileNavToggle = mobileNavToggle;

  // Register
  window.apos.modules.theme = theme;

  // Apostrophe integration - global events
  const onReadyAndRefresh = () => {
    initGalleries();
    initTabs();
  };
  apos.util.onReady(onReadyAndRefresh);
};
