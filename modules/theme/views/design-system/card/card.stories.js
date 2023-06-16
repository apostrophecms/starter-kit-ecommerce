module.exports = {
  name: 'molecules-card',
  category: 'Cards',
  data: 'card.json',
  stories: [
    {
      name: 'product-card',
      label: 'Product',
      template: 'design-system/card/product.njk',
      state: 'complete'
    },
    {
      name: 'category-card',
      label: 'Product Category',
      template: 'design-system/card/category.njk',
      state: 'complete'
    },
    {
      name: 'product-list',
      label: 'Product List',
      template: 'design-system/card/product-list.njk',
      state: 'complete'
    },
    {
      name: 'category-list',
      label: 'Category List',
      template: 'design-system/card/category-list.njk',
      state: 'complete'
    },
    {
      name: 'product-masonry',
      label: 'Product Masonry list',
      template: 'design-system/card/product-masonry.njk',
      state: 'complete'
    },
    {
      name: 'blockquote',
      label: 'Customer Review',
      template: 'design-system/card/blockquote.njk',
      state: 'complete'
    }
  ]
};
