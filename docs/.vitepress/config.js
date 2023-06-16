import { defineConfig } from 'vitepress'

// Settings
const project = `starter-kit-ecommerce`;
const repo = `apostrophecms/${project}`;
// Settings end

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: `/${project}/`,
  title: "Starter Kit",
  description: "Apostrophe CMS Starter Kit for e-commerce projects, built with Tailwind CSS.",
  appearance: true,
  themeConfig: {
    editLink: {
      pattern: `https://github.com/${repo}/edit/main/docs/:path`
    },
    logo: {
      dark: '/images/logo-on-dark.svg',
      light: '/images/logo-on-light.svg',
      alt: 'Apostrophe CMS'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'User Guide', link: '/user/', activeMatch: '/user/' },
      { text: 'Developer Guide', link: '/developer/', activeMatch: '/developer/' },
    ],

    sidebar: {
      '/user/': [
        {
          text: 'User Guide',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/user/' },
            { text: 'Getting Started', link: '/user/getting-started' },
            { text: 'Products & Categories', link: '/user/products-and-categories' },
            { text: 'Custom Pages', link: '/user/custom-pages' },
            { text: 'Widgets', link: '/user/widgets' },
            { text: 'Search & SEO', link: '/user/search-and-seo' },
          ]
        },
      ],
      '/developer/': [
        {
          text: 'Developer Guide',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/developer/' },
            { text: 'Getting Started', link: '/developer/getting-started' },
            { text: 'Branding & UI', link: '/developer/branding-and-ui' },
            { text: 'Modules & Widgets', link: '/developer/modules-and-widgets' },
            { text: 'Design System', link: '/developer/design-system' },
            { text: 'Resources', link: '/developer/resources' },
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: `https://github.com/${repo}` }
    ]
  },
  markdown: {
    languages: [
      {
        id: 'njk-html',
        scopeName: 'text.html.njk',
        grammar: require('./njk-html.tmLanguage.json'),
        displayName: 'Nunjucks',
        embeddedLangs: ['html'],
        aliases: ['njk', 'nunjucks']
      }
    ]
  }
})
