require('apostrophe')({
  shortName: 'a3-ecommerce-starter',
  modules: {
    // Design system: register only when not in production.
    // Install via `npm install @corllete/apos-ds` first.
    // Be sure to add some additonal configuration in
    // `modules/@corllete/apos-ds/index.js` and
    // `modules/@corllete/apos-ds-page-type/views/layout/preview.html`
    // and park the page in `modules/@apostrophecms/page/index.js` as
    // described in the docs.

    // ...(process.env.NODE_ENV !== 'production'
    //   ? {
    //     '@corllete/apos-ds': {
    //       options: {
    //         modules: [ 'theme' ],
    //         docs: false
    //       }
    //     },
    //     '@corllete/apos-ds-page-type': {
    //       options: {
    //         legacyCodeBlocks: false,
    //         useReleaseId: false
    //       }
    //     }
    //   }
    //   : {}
    // ),
    // END Design system

    '@apostrophecms/open-graph': {},
    '@apostrophecms/seo': {},
    i18n: {},
    tag: {},
    'product-category': {},
    'product-category-page': {},
    product: {},
    'product-page': {},
    'default-page': {},
    'content-widget': {},
    'hero-full-widget': {},
    'hero-split-widget': {},
    'cta-widget': {},
    'promo-widget': {},
    'blockquote-widget': {},
    'product-widget': {},
    'product-featured-widget': {},
    'product-category-widget': {},
    // All assets/client JS and server side templates.
    theme: {}
  }
});
