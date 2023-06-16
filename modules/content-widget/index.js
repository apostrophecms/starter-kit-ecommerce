module.exports = {
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
              className: 't-richtext my-5 md:my-10',
              toolbar: [
                'styles',
                '|',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'bulletList',
                'orderedList'
              ],
              styles: [
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
                },
                {
                  tag: 'h3',
                  label: 'Heading 3 (H3)'
                },
                {
                  tag: 'h4',
                  label: 'Heading 4 (H4)'
                }
              ]
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
