// Common URL scheme
const urlScheme = {
  label: {
    type: 'string',
    // required: true,
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
  }
};

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'app:heroSplitWidget'
  },
  fields: {
    add: {
      caption: {
        type: 'string',
        label: 'app:caption',
        max: 200
      },
      image: {
        type: 'area',
        label: 'app:image',
        options: {
          min: 1,
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        },
        required: true
      },
      imagePosition: {
        type: 'select',
        label: 'app:imagePosition',
        choices: [
          {
            label: 'app:left',
            value: 'left'
          },
          {
            label: 'app:right',
            value: 'right'
          }
        ],
        required: true,
        def: 'left'
      },
      ctaPrimary: {
        type: 'object',
        label: 'app:ctaPrimary',
        fields: {
          add: { ...urlScheme }
        }
      },
      ctaOutlined: {
        type: 'object',
        label: 'app:ctaOutlined',
        fields: {
          add: { ...urlScheme }
        }
      },
      content: {
        type: 'area',
        label: 'app:content',
        options: {
          min: 1,
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
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
                  tag: 'h1',
                  label: 'Heading'
                },
                {
                  tag: 'span',
                  class: 'text-brand-300',
                  label: 'Color Brand Light'
                },
                {
                  tag: 'span',
                  class: 'text-brand',
                  label: 'Color Brand Dark'
                },
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
                }
              ]
            }
          }
        }
      }
    }
  }
};
