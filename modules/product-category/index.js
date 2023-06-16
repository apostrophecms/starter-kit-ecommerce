module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'productCategory',
    label: 'app:productCategoryLabel',
    pluralLabel: 'app:productCategoryPluralLabel',
    shortcut: 'G,r',
    sort: {
      publishDate: -1,
      createdAt: -1
    }
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
      image: {
        type: 'area',
        label: 'app:image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        },
        required: true
      },
      _tags: {
        type: 'relationship',
        label: 'app:productCategoryTagsLabel',
        help: 'app:productCategoryTagsHelp',
        withType: 'tag',
        builders: {
          project: {
            title: 1,
            slug: 1,
            type: 1,
            _url: 1
          }
        },
        required: true
      },
      publishDate: {
        type: 'date',
        label: 'app:publishDate',
        def: null
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
          'tagline',
          'image',
          '_tags',
          'publishDate'
        ]
      },
      page: {
        label: 'app:page',
        fields: [
          'headerType',
          'heading',
          'main'
        ]
      }
    }
  },
  handlers(self) {
    return {
      beforeSave: {
        addPublishedDate(req, piece) {
          if (piece.publishDate === null) {
            piece.publishDate = new Date().toJSON().slice(0, 10);
          }
        }
      }
    };
  },
  queries(self, query) {
    return {
      builders: {
        // Add a `_productCount` property to the category.
        // Should be explicitly enabled due to performance reasons.
        // Example usage:
        // ```js
        // apos.productCategory.find(req, {})
        //  .productCount(true)
        //  .toArray();
        // ```
        productCount: {
          def: false,
          launder(value) {
            return self.apos.launder.boolean(value);
          },
          async after(results) {
            if (!query.get('productCount')) {
              return;
            }
            const promises = results.map(category => {
              if (!category.tagsIds?.length) {
                return new Promise((resolve, reject) => reject(new Error('No tagsIds on category')));
              }
              return self.apos.product
                .find(query.req, {})
                ._tags(category.tagsIds)
                .perPage(false)
                .toCount();
            });
            const counts = await Promise.allSettled(promises);
            for (const [ i, count ] of counts.entries()) {
              if (count.status === 'fulfilled') {
                results[i]._productCount = count.value;
              }
            }
          }
        }
      }
    };
  }
};
