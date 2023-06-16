module.exports = {
  name: 'atoms-buttons',
  category: 'Buttons',
  stories: [
    {
      name: 'primary',
      label: 'Primary',
      // Apostrophe qualified template path, without the module prefix
      template: 'design-system/button/primary.njk',
      state: 'complete'
    },
    {
      name: 'outlined',
      label: 'Outlined',
      // Apostrophe qualified template path, without the module prefix
      template: 'design-system/button/outlined.njk',
      state: 'complete'
    },
    {
      name: 'icon',
      label: 'Icon',
      // Apostrophe qualified template path, without the module prefix
      template: 'design-system/button/icon.njk',
      state: 'complete'
    }
  ]
};
