module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'app:productCategoryPageLabel',
    alias: 'productCategoryPage',
    perPage: 99
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
  extendMethods(self) {
    return {
      indexQuery(_super, req) {
        const query = _super(req);
        query.productCount(true).limit(0);
        return query;
      }
    };
  },
  methods(self) {
    return {
      // Load products based on the category `_tags` configuration,
      // mimic "index page" for products.
      async beforeShow(req) {
        const category = req.data.piece;
        if (!category) {
          return;
        }
        const page = self.apos.productPage;

        const query = page.indexQuery(req);
        await page.populatePiecesFilters(query);
        query._tags(category.tagsIds)
          .page(req.query.page || 1);

        const totalCount = await query.toCount();
        if (query.get('page') > 1 && query.get('page') > query.get('totalPages')) {
          req.notFound = true;
          return;
        }

        req.data.currentPage = query.get('page');
        req.data.totalPieces = totalCount;
        req.data.totalPages = query.get('totalPages');

        req.data.pieces = await query.toArray();
        await page.beforeIndex(req);
      }
    };
  }
};
