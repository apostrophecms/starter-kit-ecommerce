// Common URL scheme.
// XXX Revise the commented required properties when the related core issue is resolved.
const urlScheme = {
  label: {
    type: 'string',
    label: 'app:label'
  },
  urlType: {
    label: 'app:type',
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
        label: 'app:customUrl',
        value: 'custom'
      }
    ]
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
  _category: {
    label: 'app:category',
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

const searchUrlScheme = {
  ...urlScheme
};
delete searchUrlScheme.label;

module.exports = {
  fields: {
    add: {
      brandName: {
        type: 'string',
        label: 'app:brandName',
        required: true
      },
      logo: {
        type: 'area',
        label: 'app:companyLogo',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      favicon: {
        type: 'attachment',
        label: 'app:favicon',
        help: 'app:faviconHelp',
        // See /modules/@apostrophecms/attachment/index.js
        fileGroup: 'favicon'
      },
      headerNav: {
        type: 'array',
        label: 'app:mainNav',
        titleField: 'label',
        fields: {
          add: {
            ...urlScheme
          }
        }
      },
      headerCtaIcon: {
        type: 'object',
        label: 'app:ctaIcon',
        fields: {
          add: {
            icon: {
              type: 'select',
              label: 'Icon',
              choices: 'choicesIcons',
              def: null
            },
            ...urlScheme
          }
        }
      },
      headerCtaButton: {
        type: 'object',
        label: 'app:ctaButton',
        fields: {
          add: { ...urlScheme }
        }
      },
      searchUrl: {
        type: 'object',
        label: 'app:searchUrl',
        fields: {
          add: { ...searchUrlScheme }
        }
      },
      footerNav: {
        type: 'array',
        label: 'app:footerNav',
        titleField: 'label',
        fields: {
          add: { ...urlScheme }
        }
      },
      footerSocial: {
        type: 'array',
        label: 'app:socialLinks',
        style: 'table',
        inline: true,
        fields: {
          add: {
            label: {
              type: 'string',
              label: 'app:label',
              required: true
            },
            icon: {
              type: 'select',
              label: 'app:icon',
              choices: 'choicesSocialIcons',
              required: true,
              def: null
            },
            url: {
              type: 'string',
              label: 'app:url',
              required: true
            }
          }
        }
      },
      hideEmptyCategories: {
        type: 'boolean',
        label: 'app:productCategoryHideEmptyLabel',
        def: false
      },
      vatInfo: {
        type: 'string',
        label: 'app:productVatInfoLabel',
        help: 'app:productVatInfoHelp'
      }
    },
    group: {
      header: {
        label: 'app:header',
        fields: [
          'headerNav',
          'searchUrl',
          'headerCtaIcon',
          'headerCtaButton'
        ]
      },
      footer: {
        label: 'app:footer',
        fields: [
          'footerNav',
          'footerSocial'
        ]
      },
      products: {
        label: 'app:productPluralLabel',
        fields: [
          'hideEmptyCategories',
          'vatInfo'
        ]
      },
      branding: {
        label: 'app:branding',
        fields: [
          'brandName',
          'favicon',
          'logo'
        ]
      }
    }
  },

  methods(self) {
    return {
      choicesSocialIcons() {
        return [
          {
            label: '--',
            value: null
          },
          ...self.apos.theme.getSocialIcons()
        ];
      },
      choicesIcons() {
        return [
          {
            label: '--',
            value: null
          },
          ...self.apos.theme.getIcons()
        ];
      }
    };
  }
};
