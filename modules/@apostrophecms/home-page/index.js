module.exports = {
  options: {
    label: 'app:homePage'
  },
  fields: {
    add: {
      heading: {
        type: 'area',
        options: {
          widgets: {
            'hero-full': {}
          },
          max: 1
        }
      },
      main: {
        type: 'area',
        options: {
          widgets: {
            product: {},
            'product-featured': {},
            'product-category': {},
            cta: {},
            promo: {},
            blockquote: {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'app:groupBasics',
        fields: [
          'title',
          'heading',
          'main'
        ]
      }
    }
  }
};
