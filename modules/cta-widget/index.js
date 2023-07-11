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
  }
};

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'app:ctaWidget'
  },
  fields: {
    add: {
      renderType: {
        type: 'select',
        label: 'app:renderType',
        choices: [
          {
            label: 'app:renderTypeDark',
            value: 'dark'
          },
          {
            label: 'app:renderTypeLight',
            value: 'light'
          },
          {
            label: 'app:renderTypeImage',
            value: 'image'
          }
        ],
        required: true,
        def: 'dark'
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
        required: true,
        if: {
          renderType: 'image'
        }
      },
      title: {
        type: 'string',
        label: 'app:title',
        max: 200,
        required: true
      },
      content: {
        type: 'area',
        label: 'app:content',
        options: {
          max: 1,
          min: 1,
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
                  tag: 'p',
                  label: 'Paragraph (P)'
                }
              ]
            }
          }
        }
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
      }
    }
  }
};
