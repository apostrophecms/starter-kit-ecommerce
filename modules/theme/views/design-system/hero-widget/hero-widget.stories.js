module.exports = {
  name: 'molecules-hero-widget',
  category: 'Widgets',
  data: 'data.json',
  stories: [
    {
      name: 'hero-widget-full',
      label: 'Hero - Full',
      template: 'design-system/hero-widget/full.njk',
      state: 'complete'
    },
    {
      name: 'hero-widget-split',
      label: 'Hero - Split',
      template: 'design-system/hero-widget/split.njk',
      state: 'complete'
    }
  ]
};
