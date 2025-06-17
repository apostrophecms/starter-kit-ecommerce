export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'app:contentWidget'
  },
  fields: {
    add: {
      content: {
        type: 'area',
        label: 'app:content',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              className: 't-richtext my-5 md:my-10'
            },
            '@apostrophecms/image': {
              className: 'my-5 md:my-10'
            },
            '@apostrophecms/video': {
              className: 'my-5 md:my-10'
            }
          }
        }
      }
    }
  }
};
