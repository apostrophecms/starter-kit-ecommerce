// Common URL scheme
const urlScheme = {
  label: {
    type: 'string',
    label: 'app:label'
  },
  urlType: {
    label: 'app:urlType',
    type: 'select',
    choices: [
      {
        label: 'app:page',
        value: 'page'
      },
      {
        label: 'app:productCategoryLabel',
        value: 'category'
      },
      {
        label: 'app:file',
        value: 'file'
      },
      {
        label: 'app:customUrl',
        value: 'custom'
      }
    ],
    required: true
  },
  url: {
    type: 'url',
    label: 'app:url',
    required: true,
    if: {
      urlType: 'custom'
    }
  },
  _page: {
    label: 'app:page',
    type: 'relationship',
    withType: '@apostrophecms/any-page-type',
    max: 1,
    builders: {
      areas: false,
      relationships: false,
      project: {
        title: 1,
        slug: 1,
        _url: 1,
        type: 1
      }
    },
    required: true,
    if: {
      urlType: 'page'
    }
  },
  _file: {
    label: 'app:file',
    type: 'relationship',
    withType: '@apostrophecms/file',
    max: 1,
    builders: {
      areas: false,
      relationships: false,
      project: {
        title: 1,
        slug: 1,
        attachment: 1,
        _url: 1,
        type: 1
      }
    },
    required: true,
    if: {
      urlType: 'file'
    }
  },
  _category: {
    label: 'app:productCategoryLabel',
    type: 'relationship',
    withType: 'product-category',
    max: 1,
    builders: {
      areas: false,
      relationships: false,
      project: {
        title: 1,
        slug: 1,
        _url: 1,
        type: 1
      }
    },
    required: true,
    if: {
      urlType: 'category'
    }
  },
  isPrimary: {
    type: 'boolean',
    label: 'app:isPrimary',
    def: false
  }
};

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'app:productPluralLabel'
  },
  fields: {
    add: {
      condensed: {
        type: 'boolean',
        label: 'app:condensedView',
        help: 'app:condensedViewHelp',
        def: false
      },
      listType: {
        type: 'select',
        label: 'app:listType',
        choices: [
          {
            label: 'app:listTypeRecent',
            value: 'recent'
          },
          {
            label: 'app:listTypeCategory',
            value: 'category'
          },
          {
            label: 'app:listTypeTags',
            value: 'tags'
          },
          {
            label: 'app:listTypeManual',
            value: 'manual'
          }
        ],
        required: true,
        def: 'manual'
      },
      _category: {
        type: 'relationship',
        label: 'app:chooseCategory',
        withType: 'product-category',
        // min: 1,
        max: 1,
        builders: {
          project: {
            title: 1,
            slug: 1,
            image: 1,
            _url: 1,
            type: 1
          }
        },
        if: {
          listType: 'category'
        }
      },
      _tags: {
        type: 'relationship',
        label: 'app:chooseTags',
        withType: 'tag',
        // min: 1,
        max: 10,
        if: {
          listType: 'tags'
        }
      },
      _manual: {
        type: 'relationship',
        label: 'app:chooseProducts',
        withType: 'product',
        // min: 1,
        max: 10,
        builders: {
          project: {
            title: 1,
            slug: 1,
            image: 1,
            price: 1,
            pricePromo: 1,
            buyNowUrl: 1,
            _url: 1,
            type: 1
          }
        },
        if: {
          listType: 'manual'
        }
      },
      limit: {
        type: 'integer',
        label: 'app:limit',
        def: 3,
        if: {
          $or: [
            { listType: 'recent' },
            { listType: 'category' },
            { listType: 'tags' }
          ]
        }
      },
      title: {
        type: 'string',
        label: 'app:title'

      },
      tagline: {
        type: 'string',
        label: 'app:tagline',
        textarea: true,
        max: 200
      },
      viewMore: {
        type: 'object',
        label: 'app:cta',
        fields: {
          add: { ...urlScheme }
        }
      }
    }
  },
  extendMethods(self) {
    return {
      // Load products based on the widget's `listType` configuration
      async load(_super, req, widgets) {
        await _super(req, widgets);
        const manager = self.apos.product;
        const project = {
          title: 1,
          slug: 1,
          image: 1,
          price: 1,
          pricePromo: 1,
          buyNowUrl: 1,
          _url: 1,
          type: 1
        };

        for (const widget of widgets) {
          switch (widget.listType) {
            case 'recent':
              widget._products = await manager
                .find(req, {})
                .project(project)
                .limit(widget.limit)
                .toArray();
              break;

            case 'category': {
              const categoryTags = widget._category?.[0]?.tagsIds || [];
              widget._products = await manager
                .find(req, {})
                ._tags(categoryTags)
                .project(project)
                .limit(widget.limit)
                .toArray();
              break;
            }

            case 'tags':
              widget._products = await manager
                .find(req, {})
                ._tags(widget.tagsIds || [])
                .project(project)
                .limit(widget.limit)
                .toArray();
              break;

            default:
              widget._products = widget._manual;
              break;
          }
        }
      }
    };
  }
};
