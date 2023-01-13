# Summary

This repo contains 4 packages: `@klimadao/site`, `@klimadao/app`, `@klimadao/cms` and `@klimadao/lib`.

`@klimadao/site` -> klimadao.finance homepage. In the future, we can add the docs and blog as well.

`@klimadao/app` -> app.klimadao.finance, a standalone single-page-app. Should be exportable as a static site for deployment on IPFS.

`@klimadao/lib` -> A shared component and theme library. For now, just a set of resources shared by the above two apps. In the future, this can be extended and published on NPM as a component library for use in other community projects.

`@klimadao/cms` -> The Content Management System at klimadao.sanity.studio. NOTE: Unlike the other packages, this one is **not** included as an NPM workspace from the root package.json. To work with the CMS you need to run `sanity install` from inside the `cms` folder. This is because it is managed by the sanity [command line interface](https://www.sanity.io/docs/getting-started-with-sanity-cli), which uses `yarn` under the hood.

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

## Development

A set of NPM Workspace commands are provided, and can be run from the root folder.

`npm run dev-all`: run all workspaces with hot reloading enabled.

> Website can be accessed at [http://localhost:3000](http://localhost:3000)

> App can be accessed at [http://localhost:3001](http://localhost:3001)

To run dev on a specific workspace use:

- `npm run dev-site`
- `npm run dev-app`
- `npm run dev-lib`

`npm run format-all`: Format all files with `prettier`.

`npm run extract-strings:dev`: Extract translation files for the source language "en".

`npm run build-all`: build all workspaces.

## Translations

### For Developers

This repo uses [lingui](https://lingui.js.org/tutorials/react.html) in combination with [translation.io](https://translation.io).

We follow these rules:

- always add an ID to each translation
- extract the source translation with `npm run extract-strings:dev`
- commit source language files "en" only

### For translators

#### Setup

- Create an account on [translation.io](https://translation.io)
- Request access to the project atmosfearful/klimadao in the #content-translation KlimaDAO discord server

#### Translating

- Log in [translation.io](https://translation.io)
- Select the approprite project klimadao-site or klimadao-app
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

## ENS Names and Ether URLs

In order to reference ENS names or ethereum urls in the development environment you will need to:

1. Register at https://www.infura.io/
2. Create a new project
3. Add the `Polygon PoS` addon and your card details at https://app.infura.io/settings/payment
4. Copy the API Key for the new project to the `INFURA_ID` value in `.env.local`

without this step pages such as `https://localhost:3000/retirements/<some.ens>` will fail to load while developing.

# Contributing

**The DAO is looking for react/typescript devs as well as experienced Solidity devs!** Enjoy a flexible work schedule and work on something truly ambitious and meaningful. Monthly compensation available based on your level of experience and degree of contribution.

If you'd like to just take a ticket or fix a bug, go for it (always better to ask first, though).

If you'd like to become a regular contributor to the DAO, [join the KlimaDAO discord](https://discord.gg/utTTEbrk) and follow the application instructions.

📚Check out the [contribution & style guide](https://github.com/KlimaDAO/klimadao/wiki).
