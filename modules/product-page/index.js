module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'app:productPageLabel',
    alias: 'productPage',
    perPage: 15
  },
  fields: {
    add: {
      tagline: {
        type: 'string',
        textarea: true,
        label: 'app:tagline',
        max: 200
      },
      main: {
        type: 'area',
        label: 'app:content',
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
        fields: [ 'tagline', 'main' ]
      }
    }
  },
  methods(self) {
    return {
      async beforeShow(req) {
        if (!req.data.piece.tagsIds.length) {
          return;
        }
        req.data.relatedProducts = await self.apos.product.find(req, {
          _id: {
            $ne: req.data.piece._id
          }
        })
          ._tags(req.data.piece.tagsIds)
          .sort({
            publishDate: -1,
            updatedAt: -1
          })
          .limit(4)
          .toArray();
      }
    };
  }
};
