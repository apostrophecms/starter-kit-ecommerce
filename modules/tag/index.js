module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'tag',
    autopublish: true,
    label: 'app:tagLabel',
    pluralLabel: 'app:tagPluralLabel',
    seoFields: false,
    openGraph: false,
    searchable: false
  },
  fields: {
    remove: [ 'visibility' ],
    group: {
      basics: {
        label: 'app:groupBasics',
        fields: [ 'title' ]
      }
    }
  }
};
