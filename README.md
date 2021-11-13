# Summary
This repo contains 3 packages: `@klimadao/site`, `@klimadao/app` and `@klimadao/lib`.

`@klimadao/site` -> klimadao.finance homepage. In the future, we can add the docs and blog as well.

`@klimadao/app` -> dapp.klimadao.finance app, a standalone single-page-app. Should be exportable as a static site for deployment on IPFS.

`@klimadao/lib` -> A shared component and theme library. For now, just a set of resources shared by the above two apps. In the future, this can be extended and published on NPM as a component library for use in other community projects.

# Getting Started
## Requirements
Take note, this repo utilizes newer features from Node, NPM and the upcoming release of Typescript.

- node >= v16.x
- npm >= v8.x (necessary for NPM Workspaces)
- typescript >= 4.5.0-beta (better ESModules support)
- vscode-prettier extension

## Install dependencies
Be sure you have the above dependencies, and are using typescript 4.5 or later (currently in beta):

`npm install -g typescript@4.5.0-beta`

Then, `npm install` from the `klimadao/` root folder, *not* from individual packages.

## Develop
A set of NPM Workspace commands are provided, and can be run from the root folder.

`npm run dev-site`: run the website on localhost:3000

`npm run dev-app`: run the app on localhost:3001

`npm run dev-lib`: Watches for changes in `@klimadao/lib` and re-compiles to typescript on save. Alternatively, run `npm run build-lib` to compile once (this is already done automatically for the above two commands).

# Contribution Guide
Coming Soon.
The GitHub Issues board should be our source-of-truth and where most engineering discussion takes place.
