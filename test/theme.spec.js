const assert = require('assert/strict');
const {
  processSelf,
  chai,
  expect
} = require('./lib/tools');

const themeModule = require('../modules/theme');
const svgIconsMock = [
  {
    label: 'Quote',
    value: 'quote'
  },
  {
    label: 'Social Twitter',
    value: 'social-twitter'
  }
];

describe('Theme module helpers and methods', function () {
  it('should exist', () => {
    assert(themeModule);
  });

  it('should retrieve icons', function () {
    const self = processSelf(themeModule, {
      svgIcons: svgIconsMock
    });
    const icons = self.getIcons();
    assert.deepEqual(icons, svgIconsMock);
  });

  it('should retrieve social icons only', function () {
    const self = processSelf(themeModule, {
      svgIcons: svgIconsMock
    });
    const icons = self.getSocialIcons();

    assert.deepEqual(icons, [
      {
        label: 'Social Twitter',
        value: 'social-twitter'
      }
    ]);
  });

  it('should not fail when no icons', function () {
    const self = processSelf(themeModule);

    const icons = self.getIcons();
    const socialIcons = self.getSocialIcons();

    assert.deepEqual(icons, []);
    assert.deepEqual(socialIcons, []);
  });

  it('should filter categories', function () {
    const self = processSelf(themeModule);

    const categories = [
      {
        title: 'Category 1'
      },
      {
        title: 'Category 2',
        _productCount: 0
      },
      {
        title: 'Category 3',
        _productCount: -1
      },
      {
        title: 'Category 4',
        _productCount: 1
      }
    ];
    const config = {
      hideEmptyCategories: true
    };
    const result = self.maybeFilterEmptyCategories(categories, config);
    assert.deepEqual(result, [
      {
        title: 'Category 4',
        _productCount: 1
      }
    ]);
  });

  it('should not filter categories by configuration', function () {
    const self = processSelf(themeModule);

    const categories = [
      {
        title: 'Category 1'
      },
      {
        title: 'Category 2',
        _productCount: 0
      },
      {
        title: 'Category 3',
        _productCount: -1
      },
      {
        title: 'Category 4',
        _productCount: 1
      }
    ];
    const config = {
      hideEmptyCategories: false
    };
    const result = self.maybeFilterEmptyCategories(categories, config);
    assert.deepEqual(result, categories);
  });

  it('should not filter categories when configuration is missing', function () {
    const self = processSelf(themeModule);

    const categories = [
      {
        title: 'Category 1'
      },
      {
        title: 'Category 2',
        _productCount: 0
      },
      {
        title: 'Category 3',
        _productCount: -1
      },
      {
        title: 'Category 4',
        _productCount: 1
      }
    ];
    const result = self.maybeFilterEmptyCategories(categories);
    assert.deepEqual(result, categories);
  });

  it('should get first (Nunjucks filter)', function () {
    const self = processSelf(themeModule);

    assert.equal(
      self.firstFilter('string'),
      's',
      'should return first character');

    assert.equal(
      self.firstFilter([ 1, 2, 3 ]),
      1
    );

    assert.equal(
      self.firstFilter(null),
      null,
      'should return null when input is null'
    );

    assert.equal(
      self.firstFilter(),
      undefined,
      'should return undefined when input is undefined'
    );

    assert.deepEqual(
      self.firstFilter({}),
      {},
      'should return {} when input is {}'
    );
  });

  it('should concat (Nunjucks filter)', function () {
    const self = processSelf(themeModule);

    assert.equal(
      self.concatFilter('string', 's'),
      'strings',
      'should return concatenated string');

    assert.deepEqual(
      self.concatFilter([ 1, 2, 3 ], [ 4, 5, 6 ]),
      [ 1, 2, 3, 4, 5, 6 ],
      'should return concatenated array');

    assert.equal(
      self.concatFilter(null, 's'),
      'nulls',
      'should return string when input is null'
    );

    assert.equal(
      self.concatFilter([ 1, 2 ], 's'),
      '1,2s',
      'should return string when input is null'
    );

    assert.equal(
      self.concatFilter(undefined, 's'),
      'undefineds',
      'should return string when input is null'
    );
  });

  it('should add Nunjucks filters', function () {
    const self = processSelf(themeModule, {
      apos: {
        template: {
          addFilter: chai.spy()
        }
      }
    });

    self.addNjkFilters();

    expect(self.apos.template.addFilter)
      .to.have.been.called.exactly(1)
      .with.exactly({
        first: self.firstFilter,
        concat: self.concatFilter
      });
  });

  it('should have icons helper', function () {
    const self = processSelf(themeModule, {
      svgIcons: svgIconsMock
    });
    self.getIcons = chai.spy(() => svgIconsMock);
    const icons = self.helpers.icons();

    assert.deepEqual(icons, svgIconsMock);
    expect(self.getIcons).to.have.been.called.exactly(1)
      .with.exactly();
  });

  it('should formatPrice (Nunjucks helper)', function () {
    const self = processSelf(themeModule);

    assert.equal(
      self.helpers.formatPrice(100),
      '100.00',
      'should format price with 2 decimals'
    );

    assert.deepEqual(
      self.helpers.formatPrice('string'),
      'NaN',
      'should fail when input is not a number'
    );
  });

  it('should return type (Nunjucks helper)', function () {
    const self = processSelf(themeModule);

    assert.equal(
      self.helpers.typeOf('string'),
      'string',
      'should return type of string'
    );

    assert.equal(
      self.helpers.typeOf(1),
      'number',
      'should return type of number'
    );

    assert.equal(
      self.helpers.typeOf({}),
      'object',
      'should return type of object'
    );

    assert.equal(
      self.helpers.typeOf([]),
      'object',
      'should return type of array'
    );

    assert.equal(
      self.helpers.typeOf(null),
      'object',
      'should return type of null'
    );

    assert.equal(
      self.helpers.typeOf(undefined),
      'undefined',
      'should return type of undefined'
    );
  });

  it('should process navigation items (Nunjucks helper)', function () {
    const self = processSelf(themeModule);

    const items = [
      {
        urlType: 'custom',
        url: '/home',
        _page: 'ignored',
        _category: 'ignored',
        _product: 'ignored',
        _file: 'ignored'
      },
      {
        urlType: 'page',
        url: 'ignored',
        _page: [ { _url: '/about' } ],
        _category: 'ignored',
        _product: 'ignored',
        _file: 'ignored'
      },
      {
        urlType: 'category',
        url: 'ignored',
        _page: 'ignored',
        _category: [ { _url: '/category' } ],
        _product: 'ignored',
        _file: 'ignored'
      },
      {
        urlType: 'product',
        url: 'ignored',
        _page: 'ignored',
        _category: 'ignored',
        _product: [ { _url: '/product' } ],
        _file: 'ignored'
      },
      {
        urlType: 'file',
        url: 'ignored',
        _page: 'ignored',
        _category: 'ignored',
        _product: 'ignored',
        _file: [ { _url: '/file' } ]
      }
    ];

    const result = self.helpers.navItems(items);

    assert.equal(result[0].url, '/home');
    assert.equal(result[0].active, false);
    assert.equal(result[1].url, '/about');
    assert.equal(result[1].active, false);
    assert.equal(result[2].url, '/category');
    assert.equal(result[2].active, false);
    assert.equal(result[3].url, '/product');
    assert.equal(result[3].active, false);
    assert.equal(result[4].url, '/file');
    assert.equal(result[4].active, false);
  });

  it('should mark navigation acvtive item (Nunjucks helper)', function () {
    const self = processSelf(themeModule);

    const items = [
      {
        urlType: 'custom',
        url: '/'
      },
      {
        urlType: 'custom',
        url: 'http://example.com/products'
      },
      {
        urlType: 'custom',
        url: '/categories'
      },
      {
        urlType: 'custom',
        url: '/categories/some-category'
      }
    ];

    // Test home /
    {
      const result = self.helpers.navItems(items, '/');
      assert.equal(result[0].active, true, 'should mark home active');
      assert.equal(result[1].active, false, 'should not mark products active');
      assert.equal(result[2].active, false, 'should not mark categories active');
      assert.equal(result[3].active, false, 'should not mark some-category active');
    }
    // Test home full url http://example.com
    {
      const result = self.helpers.navItems(items, 'http://example.com');
      assert.equal(result[0].active, true, 'should mark home active (full url)');
      assert.equal(result[1].active, false, 'should not mark products active (full url)');
      assert.equal(result[2].active, false, 'should not mark categories active (full url)');
      assert.equal(result[3].active, false, 'should not mark some-category active (full url)');
    }
    // Test products /products
    {
      const result = self.helpers.navItems(items, '/products');
      assert.equal(result[0].active, false, 'should not mark home active');
      assert.equal(result[1].active, true, 'should mark products active');
      assert.equal(result[2].active, false, 'should not mark categories active');
      assert.equal(result[3].active, false, 'should not mark some-category active');
    }
    // Test products full url http://example.com/products
    {
      const result = self.helpers.navItems(items, 'http://example.com/products');
      assert.equal(result[0].active, false, 'should not mark home active (full url)');
      assert.equal(result[1].active, true, 'should mark products active (full url)');
      assert.equal(result[2].active, false, 'should not mark categories active (full url)');
      assert.equal(result[3].active, false, 'should not mark some-category active (full url)');
    }
    // Test categories /categories
    {
      const result = self.helpers.navItems(items, '/categories');
      assert.equal(result[0].active, false, 'should not mark home active');
      assert.equal(result[1].active, false, 'should not mark products active');
      assert.equal(result[2].active, true, 'should mark categories active');
      assert.equal(result[3].active, false, 'should not mark some-category active');
    }
    // Test categories full url http://example.com/categories
    {
      const result = self.helpers.navItems(items, 'http://example.com/categories');
      assert.equal(result[0].active, false, 'should not mark home active (full url)');
      assert.equal(result[1].active, false, 'should not mark products active (full url)');
      assert.equal(result[2].active, true, 'should mark categories active (full url)');
      assert.equal(result[3].active, false, 'should not mark some-category active (full url)');
    }
    // Test some-category /categories/some-category
    {
      const result = self.helpers.navItems(items, '/categories/some-category');
      assert.equal(result[0].active, false, 'should not mark home active');
      assert.equal(result[1].active, false, 'should not mark products active');
      assert.equal(result[2].active, false, 'should not mark categories active');
      assert.equal(result[3].active, true, 'should mark some-category active');
    }
    // Test some-category full url http://example.com/categories/some-category
    {
      const result = self.helpers.navItems(items, 'http://example.com/categories/some-category');
      assert.equal(result[0].active, false, 'should not mark home active (full url)');
      assert.equal(result[1].active, false, 'should not mark products active (full url)');
      assert.equal(result[2].active, false, 'should not mark categories active (full url)');
      assert.equal(result[3].active, true, 'should mark some-category active (full url)');
    }
  });
});
