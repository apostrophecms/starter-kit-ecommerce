module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'app:blockquoteWidget'
  },
  fields: {
    add: {
      image: {
        type: 'area',
        label: 'app:image',
        options: {
          min: 1,
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        },
        required: true
      },
      content: {
        type: 'area',
        label: 'app:content',
        options: {
          min: 1,
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
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
                }
              ]
            }
          }
        },
        required: true
      },
      title: {
        type: 'string',
        label: 'app:name',
        required: true
      },
      subtitle: {
        type: 'string',
        label: 'app:position'
      },
      sectionTitle: {
        type: 'string',
        label: 'app:sectionTitle'
      }
    }
  }
};
