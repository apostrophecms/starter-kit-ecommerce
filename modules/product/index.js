module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'product',
    label: 'app:productLabel',
    pluralLabel: 'app:productPluralLabel',
    sort: {
      featured: -1,
      publishDate: -1,
      createdAt: -1
    }
  },
  fields: {
    add: {
      tagline: {
        type: 'string',
        textarea: true,
        label: 'app:tagline',
        help: 'app:productTaglineHelp',
        max: 200
      },
      featured: {
        type: 'boolean',
        label: 'app:featured',
        def: false
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
        }
      },
      meta: {
        type: 'array',
        inline: true,
        style: 'table',
        label: 'app:productMetaLabel',
        fields: {
          add: {
            label: {
              type: 'string'
            },
            value: {
              type: 'string'
            }
          }
        },
        max: 4
      },
      price: {
        type: 'float',
        label: 'app:productPriceLabel',
        required: true
      },
      pricePromo: {
        type: 'float',
        label: 'app:productPricePromoLabel'
      },
      buyNowUrl: {
        type: 'url',
        label: 'app:productBuyNowUrlLabel'
      },
      image: {
        type: 'area',
        label: 'app:productImage',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        },
        required: true
      },
      _images: {
        label: 'app:productImages',
        type: 'relationship',
        withType: '@apostrophecms/image',
        builders: {
          project: {
            titleSortified: 0,
            highSearchText: 0,
            highSearchWords: 0,
            lowSearchText: 0,
            searchSummary: 0,
            advisoryLock: 0
          }
        }
      },
      details: {
        type: 'area',
        label: 'app:productDetailsLabel',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              className: 't-richtext my-6',
              toolbar: [
                'styles',
                '|',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'bulletList',
                'orderedList'
              ],
              styles: [
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
                },
                {
                  tag: 'h3',
                  label: 'Heading 3 (H3)'
                },
                {
                  tag: 'h4',
                  label: 'Heading 4 (H4)'
                }
              ]
            }
          }
        }
      },
      specs: {
        type: 'array',
        inline: true,
        label: 'app:productSpecsLabel',
        fields: {
          add: {
            label: {
              type: 'string',
              label: 'app:label',
              required: true
            },
            formatted: {
              type: 'boolean',
              label: 'app:productSpecsFormattedLabel',
              def: false
            },
            value: {
              type: 'string',
              lable: 'app:value',
              required: true,
              if: {
                formatted: false
              }
            },
            desc: {
              type: 'area',
              label: 'app:productSpecsDescLabel',
              options: {
                max: 1,
                widgets: {
                  '@apostrophecms/rich-text': {
                    // Use `prose` and remove the first P margin
                    className: 't-richtext -mt-5',
                    toolbar: [
                      'styles',
                      '|',
                      'bold',
                      'italic',
                      'strike',
                      'link',
                      '|',
                      'bulletList',
                      'orderedList'
                    ],
                    styles: [
                      {
                        tag: 'p',
                        label: 'Paragraph (P)'
                      }
                    ]
                  }
                }
              },
              required: true,
              if: {
                formatted: true
              }
            }
          }
        }
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
          'featured',
          'price',
          'pricePromo',
          'image',
          '_images',
          '_tags',
          'meta',
          'details',
          'specs',
          'buyNowUrl',
          'publishDate'
        ]
      },
      page: {
        label: 'app:page',
        fields: [
          'main'
        ]
      }
    }
  },
  handlers(self) {
    return {
      beforeSave: {
        addPublishedDate(req, piece) {
          if (!piece.publishDate) {
            piece.publishDate = new Date().toJSON().slice(0, 10);
          }
        }
      }
    };
  }
};
