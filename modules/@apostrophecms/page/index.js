const park = [];
// Design system: park the only when in local environment.
if (process.env.NODE_ENV !== 'production') {
  // Enable Corllete design system if installed.
  // park.push({
  //   parkedId: 'design-system',
  //   type: '@corllete/apos-ds-page-type',
  //   _defaults: {
  //     slug: '/ds',
  //     title: 'Design System'
  //   }
  // });
}

module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'app:default'
      },
      {
        name: 'product-page',
        label: 'app:productLabel'
      },
      {
        name: 'product-category-page',
        label: 'app:productCategoryLabel'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'app:home'
      }
    ],
    park: [
      ...park,
      {
        parkedId: 'core-search',
        type: '@apostrophecms/search',
        slug: '/search',
        _defaults: {
          title: 'Search'
        }
      }
    ]
  }
};
