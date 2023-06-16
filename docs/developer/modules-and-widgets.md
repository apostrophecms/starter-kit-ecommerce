---
title: Modules & Widgets
titleTemplate: Developer
# outline: 3 - example of configuring the right side in-page navigation heading source
---

# {{ $frontmatter.title }}

## Tag

- **Name**: `tag`
- **Location**: `modules/tag/` 
- **Type**: `piece`

A simple but important piece module. It's in the heart of the content taxonomy. It's currently used by Products and Product Category to deliver a powerful filtering. This can be extended to any content. For example, if developing a Blog module, add `_tags` field of type `relationship`. Doing that will allow Blog posts to share tags with products thus cross-linking both (e.g. showing Related Blog Posts in product view or promoting products by shared with the post tag in the Blog post view).

## Product

- **Name**: `product`
- **Location**: `modules/product/` 
- **Type**: `piece`

Contains the Product schema. You can extend, modify or remove fields but be sure to make relevant changes in the product page and widget component.

The products are sorted in ascending order by `featured`, `publishDate` and `createdDate` by default. You can change that behavior in the module options.

The `publishDate` field is used to ensure additional control over the product list order. It's automatically set to the current date if empty (see the relevant `beforeSave` event handler).

## Product Page

- **Name**: `product-page`
- **Location**: `modules/product-page/` 
- **Type**: `page`

Delivers the product list and view experience. This is the only module containing actual UI presentation outside of the `theme/views/` - see `product-page/views/show.html`. The reason for that is readability. You are free to further split it to UI components when your are in a need for scaling up your application.

This module showcases querying and injecting additional data in a show page. You can find in the `beforeShow` method in `product-page/index.js` how it's done. What happens there is:
- Query the product piece module for a list of products having similar to the current product
- Attach this result to `req.data.relatedProducts`
- `show.html` consumes `data.relatedProducts` to show a related products section. 

This is also a good showcase of reusing UI components - both the product widget and the embedded in the page related products section are using the `theme/views/product-widget.html` component.

## Product Category

- **Name**: `product-category`
- **Location**: `modules/product-category/` 
- **Type**: `piece`

The Product Category piece uses the `tag` module to allow the Product Category page to retrieve a filtered collection of products. It has no direct or reverse relationship with products.

It also adds a `productCount` query builder, that computes and adds `_productCount` computed property to every category piece - the number of products in a given category. You can find the implementation of the query builder in `product-category/index.js`. 

Similar to products, product categories can also control their sort order via a `publishDate` field.

You can also control every Product Category Page view via a special `heading` schema field. It allows switching from a standard page heading to a hero widget.

## Product Category Page

- **Name**: `product-category-page`
- **Location**: `modules/product-category-page/` 
- **Type**: `page`

The Product Category Page module is showing a list of all piece categories, a standard Apostrophe behavior. However, it behaves different than usual in a view mode. When previewing single category, the backend emulates a "product list" mode. This is done with the same technique used in the Product Page - `beforeShow` method. The logic that it provides:
- Use the resolved category piece by the Apostrophe core routine
- Query for products having shared tags with the current `category._tags`
- Register the allowed product list and filters the expected for pagination data
- Register the resolved data as `req.data.pieces`
- The `show.html` template consumes `data.piece` in the same way as `product-page/views/index.html` does. 

The Category Page implementation makes sure that all categories are shown (no limit and pagination) and that the introduced by the Product piece `productCount` query builder is always enabled:
```js
extendMethods(self) {
  return {
    indexQuery(_super, req) {
      const query = _super(req);
      query.productCount(true).limit(0);
      return query;
    }
  };
}
```

::: tip
The `productCount` query builder may become intense (performance wise) in websites having a lot of categories and products. You can adapt using one or more of the following solutions:
- Create MongoDB index for `product.tagsIds`
- Use caching (e.g. Redis server) when retrieving the product count
- Completely remove the `productCount` feature - remove the query builder and all usage of if it in the project
:::

An additional feature of the Product Category list is the ability to show only categories that are not empty (contain any products). This is achieved via a global configuration field `hideEmptyCategories` (disabled by default) in `modules/@apostrophecms/global/index.js`. This option will affect the page list and the category widget.

Content managers can control the Product category view heading for every category piece via the `heading` field of the category field (see [Product Category piece](#product-category)).

## Global configuration

- **Name**: `@apostrophecms/global`
- **Location**: `modules/@apostrophecms/global/` 
- **Type**: `piece`

The application configures the global core piece to control:
- Header features and main navigation
- Footer features and footer navigation
- Branding
- Product related behavior

You can extend and modify it according to your project requirements. It mainly (but not exclusively) affects the `header.html` and `footer.html` templates (in `modules/theme/view/`)

## Default (custom) Page

- **Name**: `default-page`
- **Location**: `modules/default-page/` 
- **Type**: `page`

This page type allows creating any custom page in the project. It's entirely widget driven. You might want to register any new widget to this page schema (the `main` area field).

The custom page can contain general content (rich text, images, videos, etc) or be easily turned into a Product Promo page via the long list of the widgets that it offers.

Content managers can control the page heading for every page via the `heading` field.

## Home page

- **Name**: `@apostrophecms/home-page`
- **Location**: `modules/@apostrophecms/home-page/` 
- **Type**: `page`

Similar to the Custom Page type, the home page is entirely widget driven. You might want to register new widgets appropriate for home page view to this page schema (the `main` area field).

## Search

- **Name**: `@apostrophecms/search`
- **Location**: `modules/@apostrophecms/search/` 
- **Type**: `search`

The project configures and modifies templates of the core search feature. An important condition for a better search view is the `tagline` field of every piece and page. This field is presented on every piece/page type, but not required.

## SEO and Open Graph

- **Name**: `@apostrophecms/seo`, `@apostrophecms/open-graph`
- **Location**: `-` 
- **Type**: `module`

The official Apostrophe SEO module is installed and integrated in the project. You an learn more about it [from the official documentation](https://github.com/apostrophecms/apostrophe-seo#apostrophe-seo).

The same applies for the official Apostrophe [Open Graph module](https://github.com/apostrophecms/apostrophe-open-graph#apostrophe-seo).

## i18n

- **Name**: `@apostrophecms/seo`
- **Location**: `-` 
- **Type**: `(local) module`

The project supports internationalization out of the box. All translations can be found in this project level module - `modules/i18n/i18n/app/en.json`. You can extend it with additional phrases and translate it in as many as needed languages. You can target a translation key from this file in any template, just prefixing it with `app:`

```njk
{{ __t('app:yourKey') }}
```

You can configure the core `@apostrophecms/i18n` module as you see fit. Learn more in the [official documentation](https://v3.docs.apostrophecms.org/reference/modules/i18n.html#options).

## Hero Widgets

- **Name**: `hero-full-widget`, `hero-split-widget`
- **Location**: `modules/hero-full-widget`, `modules/hero-split-widget`
- **Type**: `widget`

Used for page headings (where appropriate). It comes in two versions - image aside (split), or background image (full). It uses the UI components (fragments) from `theme/views/hero-widget.html`.

Furthermore, it configures the owned core rich text widget for better in page editing. The rich text widget makes possible to mark one or more words from the widget title in brand color. 

It supports optional call-to-action links, which can be set to a any site page or product category or even to a downloadable content.

## Call To Action Widget

- **Name**: `cta-widget`
- **Location**: `modules/cta-widget`
- **Type**: `widget`

Adds Call to Action page section. It comes in two visual versions controlled from the schema field - background image (image) and background color (solid). It uses the UI components (fragments) from `theme/views/cta-widget.html`.

Furthermore, it supports optional call-to-action links, which can be set to a any site page or product category or even to a downloadable content.

## Promo Widget

- **Name**: `promo-widget`
- **Location**: `modules/promo-widget`
- **Type**: `widget`

Adds Promo page section. It allows controlling the image side via a schema field. It uses the UI component (fragment) from `theme/views/promo-widget.html`. 

Furthermore, it supports optional call-to-action links, which can be set to a any site page or product category or even to a downloadable content.

## Product Widget

- **Name**: `product-widget`
- **Location**: `modules/product-widget`
- **Type**: `widget`

An extremely flexible in terms of filtering/choosing content widget. It allows automated resolving of any number of products based on tag, recent date or category. I also has a manual mode when content managers can manually pick a product.

The product cards and list can be found in `theme/views/card.html`.

## Featured Product Widget

- **Name**: `product-featured-widget`
- **Location**: `modules/product-featured-widget`
- **Type**: `widget`

Same as the [Product Widget](#product-widget), but filters the `recent` result by the `featured` product flag and uses the `masonry` product card list.

## Product Category Widget

- **Name**: `product-category-widget`
- **Location**: `modules/product-category-widget`
- **Type**: `widget`

Used to promote Product Categories - recent or manually chosen. 

The product cards and list can be found in `theme/views/card.html`. The product category cards and list can be found in `theme/views/card.html`.

## Blockquote widget

- **Name**: `blockquote-widget`
- **Location**: `modules/blockquote-widget`
- **Type**: `widget`

A simple widget for promoting Custom Reviews. Use the UI component developed in `theme/views/blockquote.html`.

## Content Widget

- **Name**: `blockquote-widget`
- **Location**: `modules/blockquote-widget`
- **Type**: `widget`

The Content Widget acts as a container for the core widgets `@apostrophecms/rich-text`, `@apostrophecms/image` and `@apostrophecms/video`. This is needed because of design and accessibility reasons. The content widget takes care of the horizontal constraints and vertical spacing of the underlying core widgets.

## Other core configuration

- `modules/@apostrophecms/page/index.js`: control the available **page types, parked pages**, etc. via the core page module configuration
- `modules/@apostrophecms/admin-bar/index.js`: control the Admin Bar main navigation groups
- `modules/@apostrophecms/rich-text-widget/index.js`: set up the default rich text widget experience

