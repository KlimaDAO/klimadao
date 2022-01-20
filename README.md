# Summary

This repo contains 3 packages: `@klimadao/site`, `@klimadao/app` and `@klimadao/lib`.

`@klimadao/site` -> klimadao.finance homepage. In the future, we can add the docs and blog as well.

`@klimadao/app` -> dapp.klimadao.finance app, a standalone single-page-app. Should be exportable as a static site for deployment on IPFS.

`@klimadao/lib` -> A shared component and theme library. For now, just a set of resources shared by the above two apps. In the future, this can be extended and published on NPM as a component library for use in other community projects.

# Getting Started

**The DAO is looking for react/typescript devs as well as experienced Solidity devs!** Enjoy a flexible work schedule and work on something truly ambitious and meaningful. Monthly compensation available based on your level of experience and degree of contribution.

If you'd like to just take a ticket or fix a bug, go for it (always better to ask first, though).

If you'd like to become a regular contributor to the DAO, [join the contributor discord](https://discord.gg/wuzAzUdcqW) and follow the application instructions.

📚Check out the [contribution & style guide](https://github.com/KlimaDAO/klimadao/wiki).

## Requirements

Take note, this repo utilizes newer features from Node, NPM and TypeScript 4.5.

- Node >= v16.x
- NPM >= v8.x (for NPM Workspaces)
- TypeScript >= 4.5 (for ESModules support) `npm install -g typescript`
- VSCode [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- VSCode [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Install dependencies

From the `klimadao/` root folder, _not_ from individual packages:
`npm install`

## Develop

A set of NPM Workspace commands are provided, and can be run from the root folder.

`npm run dev-site`: run the website on localhost:3000

`npm run dev-app`: run the app on localhost:3001

`npm run dev-lib`: Watch for changes in `@klimadao/lib` and recompile on save. Alternatively, run `npm run build-lib` to compile once (this is already done automatically for the above two commands).

`npm run format-all`: Format all files with `prettier`.
