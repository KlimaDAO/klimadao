<!-- PROJECT LOGO -->
ver
<br />

<div  align="center">

<a  href="https://github.com/github_username/repo_name">

<img  src="./assets/logo.png"  alt="Logo"  width="80"  height="80">

</a>

<h2  align="center">Carbonmark Api</h2>

<p  align="center">

A BFF API for Carbonmark

<br />

</p>

</div>

### Built With

- [Fastify](https://fastify.io)

- [Vercel](https://vercel.com)

- [Firebase](https://firebase.google.com)

- [Apollo](https://www.apollographql.com/)

- [Ethers](https://docs.ethers.org/)

<br />

## Getting Started

### Prerequisites

You will need to be authenticated to the following in order to run the project:

- Vercel - https://vercel.com/klimadao/carbonmark-api

- Firebase - https://console.firebase.google.com/project/klimadao-staging

\*\*Note all `vercel` commands should be run from within the root klimadao (monorepo) directory.

\*\*All others should be run from within the `carbonmark-api` folder

### Link your local copy of the project with vercel

1. You must be a member of the KlimaDAO project in Vercel.
2. Say `Y`es when prompted to link the project to an existing project.
3. Existing project name is `carbonmark-api`.

- run from root

```sh
vercel  link
```

### Environment Variables

The vercel config is where all environment variables required for the project are defined and can be pulled down via the `vercel-cli`.

Using the below command, the newest version of vercel cli will create a `.vercel`folder in the root and install the env variables in `.vercel/.env.development.local`.

Previous versions created and stored in an `.env.local` in the root.

Ensure you have updated vercel cli to the latest version (31.0.4 as of this doc)

### **Note:** You will need to manually remove the beginning and trailing quotation marks on the `FIREBASE_ADMIN_CERT` env var in `.vercel/env.development.local` otherwise you will receive a _SyntaxError: Unexpected token_ error when trying to run the project

- run from root

```sh
vercel  env  pull  --environment  development
```

or

```sh
vercel  env  pull  --environment  production
```

### Install dependencies

- run from root

```sh
cd  carbonmark-api && npm  ci
```

## Coming from previous version

In `carbonmark-api/`:

Delete the current `dist` folder if it exists

Run `npm run build` to create a new `dist` folder with the correct path

<!-- USAGE EXAMPLES -->

## Usage

### `vercel dev` or `npm run dev-carbonmark-api`

To start the app in dev mode.

Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

### `npm run test:postman`

Run the test cases via postman

<!-- TODO Add description about deployment process -->

<!-- TODO Add description of available endpoints -->

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>
