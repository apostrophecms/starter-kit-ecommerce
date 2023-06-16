module.exports = {
  options: {
    perPage: 15,
    suggestions: {
      limit: 10
    }
  },
  fields: {
    group: {
      seo: {
        label: 'app:searchSEO',
        fields: [
          'seoTitle',
          'seoDescription',
          '_seoCanonical',
          'seoRobots',
          'openGraphTitle',
          'openGraphDescription',
          'openGraphType',
          '_openGraphImage'
        ],
        last: true
      }
    }
  },

  extendMethods(self) {
    return {
      async indexPage(_super, req) {
        if (!req.query.q) {
          self.setTemplate(req, 'index');
          return;
        }
        await _super(req);
      }
    };
  }
};
