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
    label: 'app:productCategoryWidget'
  },
  fields: {
    add: {
      listType: {
        type: 'select',
        label: 'app:listType',
        choices: [
          {
            label: 'app:listTypeRecent',
            value: 'recent'
          },
          {
            label: 'app:listTypeManual',
            value: 'manual'
          }
        ],
        required: true,
        def: 'manual'
      },
      limit: {
        type: 'integer',
        label: 'app:limit',
        def: 4,
        if: {
          listType: 'recent'
        }
      },
      _manual: {
        type: 'relationship',
        label: 'app:chooseCategories',
        withType: 'product-category',
        // min: 1,
        builders: {
          productCount: true,
          project: {
            title: 1,
            slug: 1,
            image: 1,
            tagsIds: 1,
            _url: 1,
            type: 1
          }
        },
        max: 10,
        if: {
          listType: 'manual'
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
      // Load categories based on the widget's `listType` configuration.
      // Respect the "Show Empty" global configuration when recent list type.
      async load(_super, req, widgets) {
        await _super(req, widgets);
        const manager = self.apos.productCategory;

        for (const widget of widgets) {
          switch (widget.listType) {
            case 'recent': {
              const hideEmpty = req.data.global?.hideEmptyCategories;
              let limit = widget.limit;
              if (hideEmpty) {
                limit = 0;
              }
              widget._categories = await manager
                .find(req, {})
                .productCount(hideEmpty)
                .limit(limit)
                .project({
                  title: 1,
                  slug: 1,
                  image: 1,
                  tagsIds: 1,
                  _url: 1,
                  type: 1
                })
                .toArray();

              widget._categories = self.apos.theme.maybeFilterEmptyCategories(
                widget._categories,
                req.data.global
              )
                .slice(0, widget.limit);
              break;
            }

            default:
              widget._categories = widget._manual;
              break;
          }
        }
      }
    };
  }
};
