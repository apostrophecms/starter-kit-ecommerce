module.exports = {
  options: {
    groups: [
      {
        label: 'app:media',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/image-tag',
          '@apostrophecms/file',
          '@apostrophecms/file-tag'
        ]
      },
      {
        label: 'app:content',
        items: [
          'product',
          'product-category',
          'tag'
        ]
      }
    ]
  }
};
