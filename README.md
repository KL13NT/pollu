<p align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <a href="https://pollu.vercel.app">
    <img alt="Pollu" src="./public/assets/logo_dark.svg" width="250"/>
  </a>
</p>

## 🛰️ Pollu

> Pollu is an open-source straw poll platform built with privacy in mind! 🚀

It doesn't store your voters personal data, does its best to prevent duplicate and spam votes, and responds as fast as spawning a node js process. A single-language stack makes it easier for JavaScript to contribute. I tried my best to keep the codebase simple and straight forward.

<p align="center">
  <img alt="Pollu" src="./public/assets/cover.png" width="550"/>
</p>

## 🚀 Quick start

This project uses the following stack:

- [NextJS](https://nextjs.org) (React SSR + SSG)
- [TailwindCSS](https://tailwindcss.com) for quickly iterating designs and new components
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) (+ 60s Edge Caching)
- [ExpressJS](https://expressjs.com)
- [Mongoose ODM](https://mongoosejs.com)
- [Mongo Cloud](https://cloud.mongodb.com) as data storage
- [StorybookJS](https://storybook.js.org) for component development

1. **Install required packages**
   I use Yarn, so the installation command is `yarn` or `yarn install`.

2. **Start developing on the frontend**
   Navigate into the cloned repo directory and start it up.

   ```bash
   cd pollu
   yarn dev
   ```

3. **Start developing on both (backend and frontend)**
   Navigate into the cloned repo directory and start it up.

   ```bash
   cd pollu
   vercel dev
   ```

> ⚠️ To develop the backend you need a running local mongodb instance.

4.  **Open the source code and start editing!**

    Pollu is now running at `http://localhost:3000` and the API is running on `http://localhost:3000/api/v1`!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── .next
    ├── .storybook
    ├── .vercel
    ├── api
    ├── models
    ├── node_modules
    ├── pages
    ├── public
    ├── src

1.  **`/.next`**: This directory is produced by Nextjs for development purposes.

2.  **`/.storybook`**: This directory includes configuration files for Storybook.

3.  **`/.vercel`**: This directory (produced after you init your project with the vercel CLI) is used to store important information related to the deployed site. If you're contributing to the main website at `pollu.vercel.app` then you won't need this folder.

4.  **`/api`**: This directory contains all API serverless functions.

5.  **`/models`**: This directory contains all Mongoose models.

6.  **`/node_modules`**: This directory contains all installed packages.

7.  **`/pages`**: This directory contains all frontend pages, SSG'ed and SSR'ed.

8.  **`/public`**: This directory contains all files you wish to turn up in the production website output.

9.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end (what you see in the browser) such as React components, Storybook stories, and styling. `src` is a convention for “source code”.

10. **`/utils`**: A few abstractions used across both frontend and backend.

You should also have a `.env` at the root project directory that has two keys: [`DB_PATH`, `DB_NAME`] for the DB connection to be established correctly. This file must not be pushed to version control.

> ⚠️ I use prettier and eslint to manage style in this repo. Make sure you install them accordingly to save development time and make sure your contributions are compatible.

> ⚠️ I use the Angular [commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format) so make sure you follow that when contributing.

## 💫 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/KL13NT/pollu)

## ✋ Wish to Contribute?

I'm are open to all kinds of contributions. If you want to:

    🤔 Suggest a feature
    🐛 Report an issue
    📖 Improve documentation
    👩‍💻 Contribute to the code

You are more than welcome. Before contributing, kindly check the [guidelines](./CONTRIBUTING.md).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/sybiljas"><img src="https://avatars3.githubusercontent.com/u/51464288?v=4" width="100px;" alt=""/><br /><sub><b>Sybil Jas</b></sub></a><br /><a href="https://github.com/KL13NT/pollu/commits?author=sybiljas" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!