<p align="center">
  <a href="https://pollu.vercel.app">
    <img alt="Pollu" src="./public/assets/logo_dark.png" width="550"/>
  </a>
</p>

<h1 align="center">
  Pollu 🚀
</h1>

## Pollu
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

    ```shell
    cd pollu
    yarn dev
    ```

3. **Start developing on both (backend and frontend)**
    Navigate into the cloned repo directory and start it up.

    ```shell
    cd pollu
    vercel dev
    ```

> To develop the backend you need a running local mongodb instance.

4.  **Open the source code and start editing!**

    Pollu is now running at `http://localhost:3000` and the API is running on `http://localhost:3000/api/v1`!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── .cache
    ├── .next
    ├── .storybook
    ├── .vercel
    ├── api
    ├── src
    ├── models
    ├── node_modules
    ├── pages
    ├── public
    ├── src
    ├── utils

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 💫 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/KL13NT/pollu)
