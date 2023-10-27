[![Test](https://github.com/apostrophecms/starter-kit-ecommerce/actions/workflows/test.yml/badge.svg)](https://github.com/apostrophecms/starter-kit-ecommerce/actions/workflows/test.yml) [![Docs](https://github.com/apostrophecms/starter-kit-ecommerce/actions/workflows/docs.yml/badge.svg)](https://github.com/apostrophecms/starter-kit-ecommerce/actions/workflows/docs.yml)

# E-commerce Starter Kit for ApostropheCMS
An e-commerce Starter Kit for ApostropheCMS built with Tailwind CSS.

You can find the full documentation on how to use and extend this starter kit below:
* [User Guide](https://apostrophecms.github.io/starter-kit-ecommerce/user/)
* [Developer Guide](https://apostrophecms.github.io/starter-kit-ecommerce/developer/)

If you prefer, you can follow [these steps](https://github.com/apostrophecms/starter-kit-ecommerce/blob/main/docs/README.md) to host the docs in your local environment.

## Demo
<video src="https://user-images.githubusercontent.com/1889830/257869016-8707f5d1-b6cd-4db8-a433-393641feb3a3.mp4" controls="controls" style="max-width: 730px;">
</video>

## Getting started

This Starter Kit, also known as a boilerplate project, serves as a template for initiating new projects and is intended for use in two main ways:

1. **Using Our CLI Tool**: Run our [CLI tool](https://github.com/apostrophecms/cli) to clone this template locally, install its dependencies, and set up an initial admin user. You accomplish this using:
   
   `apos create <my-project-name> --starter=ecommerce`
  
2. **Manual Setup**: Manually `git clone` this repository and install its dependencies using `npm install`. Add an initial admin user with `node app @apostrophecms/user:add admin admin`.

For those who need to create multiple projects with additional base modules, consider [forking this repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) into your organizational or personal GitHub account. Customize it to fit your needs. To use your customized template, run the following CLI command:

  `apos create <project-name> --starter=<repo-name>`

Here, `<repo-name>` should be the URL of your forked repository, excluding the `https://github.com/` part.

**Note: This template is NOT designed to be installed into an existing project.**

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and JavaScript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

## Making it your own

This boilerplate is designed so you can install and start running it right away. If you are starting a project that will go into production one day, there are a few things you should be sure to check:

- [ ] **Update the shortname.** You don't need to perform this step if you created your project using the CLI tool. The `shortname` option in `app.js` is used for the database name (unless another is given in the `@apostrophecms/db` module). You should change this to an appropriate project name before you start adding any users or content you would like to keep.
- [ ] **Update the Express.js session secret.** The secret is set to `undefined` initially in the `modules/@apostrophecms/express/index.js` file. You should update this to a unique string.
- [ ] **Decide if you want hot reloading on.** This boilerplate uses nodemon to restart the app when files are changed. In `modules/@apostrophecms/asset/index.js` there is an option enabled to refresh the browser on restart. If you like this, do nothing. If you don't, remove the option or set it to `false`. The option has no effect when the app is in production.

## Thanks

![Thanks to our partner Corlette](https://static.apostrophecms.com/apostrophecms/starter-kit-ecommerce/images/corllete-thanks.png)

### About Apostrophe
ApostropheCMS is a powerful content management system designed for developers who want to build dynamic and robust websites and applications. The intuitive admin interface provides a user-friendly editing experience, empowering content editors to create and update content effortlessly. As a developer, you have complete control over the content structure, defining custom schemas and creating relationships between different content types.

With its developer-friendly architecture, ApostropheCMS provides the flexibility and extensibility you need to build a simple blog, an enterprise-level website, or a complex web application.


## Apostrophe starter kits
This Starter Kit was originally crafted by Corllete in partnership with Apostrophe. To learn more about Corllete visit [corllete.com](https://corllete.com). As with any open source project, this too is a community collaboration. We welcome feedback, tickets, bug fixes, and improvements.

Want to upgrade your Starter Kit to Apostrophe Pro? [Get started here](https://apostrophecms.com/pro).

Interested in publishing an Apostrophe Starter Kit and becoming a featured Apostrophe Partner? [Submit a Starter Kit](https://apostrophecms.com/starter-kits).

