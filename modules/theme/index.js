
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  options: {
    alias: 'theme'
  },
  webpack: {
    extensions: {
      // Start apostrophe in development via `APP_ANALYZE=1 npm run dev`
      // or `APP_ANALYZE=1 npm run build` to analyze the production build.
      // Tailwind is integrated in the Apostrophe public build via postcss
      // (see tailwind.config.js and postcss.config.js).
      // The only possible integration currently is via the scss preprocessor.
      // https://tailwindcss.com/docs/using-with-preprocessors#using-sass-less-or-stylus
      // @ts-check
      /** @type {import('webpack').Configuration} */
      theme: {
        plugins: [
          ...(process.env.APP_ANALYZE === '1'
            ? [ new BundleAnalyzerPlugin() ]
            : []
          )
        ]
      }
    }
  },

  init(self) {
    // Icon metadata
    self.svgIcons = [];
    try {
      self.svgIcons = require('./icons/icons.svg.json');
    } catch (e) {
      self.apos.util.warn('No SVG icons found. Run `./scripts/make-svg-sprite` to generate them.');
    }

    // Nunjucks filters
    self.addNjkFilters();
  },

  // Moved from the `asset` module that comes with the a3 boilerplate.
  // Allow app auto-restarts when in development.
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
        }
      }
    };
  },

  helpers(self) {
    return {
      // Return the generated SVG icons array.
      icons() {
        return self.getIcons();
      },
      // Format a price to two decimal places.
      formatPrice(price) {
        return parseFloat(price || 0).toFixed(2);
      },
      // Return the type of a value.
      typeOf(value) {
        return typeof value;
      },
      // Compute the navigation URLs from a `urlType` property.
      // If currentUrl is provided, match it against the resolved URL
      // and set `active` property of the first matching item to true.
      // `nav` is an array of objects, expected properties are:
      // - `urlType`: one of `page`, `category`, `file`, `custom`
      // - `url`: the URL when `custom`
      // - `_page`: the page relation when `page`
      // - `_product`: the product relation when `product`
      // - `_category`: the product category relation when `category`
      // - `_file`: the file relation when `file`
      navItems(nav, currentUrl = '') {
        if (!Array.isArray(nav)) {
          return [];
        }
        const withUrl = nav.map(item => {
          switch (item.urlType) {
            case 'page':
              item.url = item._page?.[0]?._url;
              break;
            case 'category':
              item.url = item._category?.[0]?._url;
              break;
            case 'product':
              item.url = item._product?.[0]?._url;
              break;
            case 'file':
              item.url = item._file?.[0]?._url;
              break;
            case 'custom':
            default:
              // Nothing to do, it's item.url already.
              break;
          }
          item.active = false;
          return item;
        });

        // Normalize currentUrl.
        if (typeof currentUrl !== 'string') {
          return withUrl;
        }
        currentUrl = currentUrl?.split('?')[0];
        if (!currentUrl) {
          return withUrl;
        }
        let currentPath = currentUrl;
        if (!currentPath.startsWith('http')) {
          // Mock it for the URL constructor.
          currentPath = `http://localhost${currentPath}`;
        }
        const theUrl = new URL(currentPath);
        currentPath = theUrl.pathname;

        // Try exact matches first.
        let hasMatch = false;
        for (const item of withUrl) {
          if (!item.url) {
            continue;
          }
          if (getUrl(item).pathname === currentPath) {
            item.active = true;
            hasMatch = true;
            break;
          }
        }
        if (hasMatch) {
          return withUrl;
        }

        // Try partial matches.
        for (const item of withUrl) {
          if (!item.url) {
            continue;
          }
          const url = getUrl(item);
          if (theUrl.hostname !== url.hostname) {
            continue;
          }
          if (currentPath.startsWith(url.pathname)) {
            item.active = true;
            break;
          }
        }

        return withUrl;

        function getUrl(item) {
          return new URL(
            item.url?.startsWith('http')
              ? item.url
              : `${theUrl.protocol}//${theUrl.host}${item.url}`
          );
        }
      },
      // Filter out empty categories if the config option is set.
      maybeFilterEmptyCategories(categories, config) {
        return self.maybeFilterEmptyCategories(categories, config);
      }
    };
  },

  methods(self) {
    return {
      getIcons() {
        return self.svgIcons || [];
      },
      getSocialIcons() {
        return self
          .getIcons()
          .filter(icon => icon.value.includes('social-'));
      },
      maybeFilterEmptyCategories(categories, config) {
        if (!config?.hideEmptyCategories) {
          return categories;
        }
        return categories.filter(category => category._productCount > 0);
      },
      // Fix the Nunjucks core `first` filter - don't throw on invalid input
      firstFilter(arrOrStr) {
        if (!Array.isArray(arrOrStr) && typeof arrOrStr !== 'string') {
          return arrOrStr;
        }
        return arrOrStr[0];
      },
      // Concatenate two arrays or strings
      concatFilter(arrOrStr, otherArrOrStr) {
        if (Array.isArray(arrOrStr) && Array.isArray(otherArrOrStr)) {
          return arrOrStr.concat(otherArrOrStr);
        }
        return arrOrStr + otherArrOrStr;
      },
      addNjkFilters() {
        self.apos.template.addFilter({
          first: self.firstFilter,
          concat: self.concatFilter
        });
      }
    };
  }
};
