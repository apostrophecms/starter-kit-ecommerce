import { toggle as mobileNavToggle } from './components/mobile-nav';
import { init as initGalleries } from './components/gallery';
import { init as initTabs } from './components/tabs';

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
