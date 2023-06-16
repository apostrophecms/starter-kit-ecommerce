module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'app:defaultPage'
  },
  fields: {
    add: {
      tagline: {
        type: 'string',
        label: 'app:tagline',
        textarea: true,
        max: 200
      },
      headerType: {
        type: 'select',
        label: 'app:headerType',
        choices: [
          {
            label: 'app:title',
            value: 'default'
          },
          {
            label: 'app:hero',
            value: 'widget'
          }
        ],
        required: true,
        def: 'default'
      },
      heading: {
        type: 'area',
        label: 'app:hero',
        options: {
          min: 1,
          max: 1,
          widgets: {
            'hero-full': {},
            'hero-split': {}
          }
        },
        if: {
          headerType: 'widget'
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
            blockquote: {},
            content: {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'app:groupBasics',
        fields: [
          'title',
          'tagline',
          'headerType',
          'heading',
          'main'
        ]
      }
    }
  }
};
