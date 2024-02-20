# Summary

This repo contains 6 packages.

`@klimadao/app` -> app.klimadao.finance, a standalone single-page-app for protocol interactions.

`@klimadao/carbon-projects` -> A Sanity CMS that contains curated data for Verra projects, deployed to [carbon-projects.sanity.studio](https://carbon-projects.sanity.studio/), and referenced by the Carbonmark frontend and backend. NOTE: Unlike the other packages, this one is **not** included as an NPM workspace from the root package.json. To work with the CMS you need to run `sanity install` from inside the `carbon-projects` folder.

`@klimadao/carbonmark` -> The NextJS project that powers the carbonmark web application at carbonmark.com.
The backend Node.js web-service and smart contracts are located in separate repositories.

`@klimadao/carbon` -> data.klimadao.finance site (formerly carbon.klimadao.finance)

`@klimadao/cms` -> A Sanity CMS that powers our blog, deployed to [klimadao.sanity.studio](https://klimadao.sanity.studio). NOTE: Unlike the other packages, this one is **not** included as an NPM workspace from the root package.json. To work with the CMS you need to run `sanity install` from inside the `cms` folder.

`@klimadao/lib` -> Components and utilities that are shared between packages.

`@klimadao/site` -> klimadao.finance homepage, content and cms-powered pages.

## Requirements

Take note, this repo utilizes newer features from Node, NPM and TypeScript 4.5.

- Node >= v18.17.1
- NPM >= v9.x (for NPM Workspaces)
- TypeScript >= 4.5 (for ESModules support) `npm install -g typescript`
- VSCode [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- VSCode [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Install dependencies

From the `klimadao/` root folder, _not_ from individual packages:
`npm install`

## Development

A set of NPM Workspace commands are provided, and can be run from the root folder.

- `npm run dev-all`: run all workspaces with hot reloading enabled.
- `npm run dev-app`: [http://localhost:3001](http://localhost:3001)
- `npm run dev-carbonmark`: [http://localhost:3002](http://localhost:3002)
- `npm run dev-site`: [http://localhost:3000](http://localhost:3000)
- `npm run dev-lib`: enable hot-reload for changes to components or utils.

Other scripts you should know about:

- `npm run build-all`: build all workspaces.
- `npm run format-all`: Format all files with `prettier`.
- `npm run extract-strings:dev`: Extract translation files for the source language "en".

## Type Generation
Typescript types for Carbonmark and Carbonmark API are generated via the `generate:types` script in each respective project. 

Regenerate types in any of the following changes:

1. Models in the API  (.model files)
2. Change to any of the dependant subgraphs (see `codegen.constants.ts`)
3. API Version targeted by Carbonmark

## Translations

### For Developers

This repo uses [lingui](https://lingui.js.org/tutorials/react.html) in combination with [translation.io](https://translation.io).

We follow these rules:

- Don't use ids, except for very long strings.
- Extract the source translation with `npm run extract-strings:dev`
- Commit source language files "en" only

#### Targetting a local api instance

If you would like carbonmark to target a differe instance of the `carbonmark-api`, you can set the url value via the `NEXT_PUBLIC_CARBONMARK_API_URL` environment variable:

```bash
NEXT_PUBLIC_CARBONMARK_API_URL=http://localhost:3003/api npm run dev-carbonmark
```

### For translators

#### Setup

- Create an account on [translation.io](https://translation.io)
- Request access to the project atmosfearful/klimadao in the #content-translation KlimaDAO discord server

#### Translating

- Log in [translation.io](https://translation.io)
- Select the appropriate project klimadao-site or klimadao-app
- Make sure you select the appropriate language in the top menu
- Start translating!
- Select an item to translate in the left column
- On the bottom right you will notice the source text (in English) and the place to translate the text beneath.
- You can prefill this by selecting an entry in the Suggestion area above.

## Pledge Dashboard

Klima Infinity pledge dashboard is backed by a firebase database. Follow the following to set up your dev environment if you'd like to contribute to the project.

### Setup

- Set up a firebase account and download the service account JSON file. See [here](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account) for more information.
- Remove the line breaks on the JSON file. You can use this [tool](https://www.textfixer.com/tools/remove-line-breaks.php). _Do not_ remove the `/n` characters from the `private_key` fields or the key will no longer be valid.
- Under `/site`, create a `.env.local` file with the environment variable `FIREBASE_ADMIN_CERT` set to the service account JSON file with no line breaks. It should look like this.

```
FIREBASE_ADMIN_CERT={ "type": "service_account", "project_id": "your_database_name", "private_key_id": .... }
```

# Diagrams

See [this page in the wiki of this repo](https://github.com/KlimaDAO/klimadao/wiki/Diagrams) for architecture and other diagrams.

# Contributing

**The DAO is looking for react/typescript devs as well as experienced Solidity devs!** Enjoy a flexible work schedule and work on something truly ambitious and meaningful. Monthly compensation available based on your level of experience and degree of contribution.

If you'd like to just take a ticket or fix a bug, go for it (always better to ask first, though).

If you'd like to become a regular contributor to the DAO, [join the KlimaDAO discord](https://discord.com/invite/klimadao) and follow the application instructions.

📚Check out the [contribution & style guide](https://github.com/KlimaDAO/klimadao/wiki).
