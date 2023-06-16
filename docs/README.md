A `vitepress` app to deliver the documentation for the Apostrophe CMS E-commerce Starter Kit.

Install:

```bash
npm install
```

Optionally update the dependencies:

```bash
npm update
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Make it yours

Open `.vitepress/config.js` and adapt it for your needs. Don't forget to update the repository configuration:

```js
// .vitepress/config.js

// Settings
const project = `ecommerce-starter-kit`;
const repo = `apostrophecms/${project}`;
// Settings end
```
Learn more about configuring and customizing VitePress at [https://vitepress.vuejs.org/](https://vitepress.vuejs.org/).

## Deploy

A GitHub Action workflow is configured to auto build & deploy the documentation to GitHub Pages. You can find the workflow configuration in `.github/workflows/docs.yml`.

Configure GH Pages and find the URL to your documentation in the repository settings under **Pages**.

## Remove

You can completely remove the documentation from your project by deleting:
- `docs/`
- `.github/workflows/docs.yml`
