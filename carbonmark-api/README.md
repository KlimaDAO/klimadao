<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="./assets/logo.png" alt="Logo" width="80" height="80">
  </a>

<h2 align="center">Carbonmark Api</h2>

  <p align="center">
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

**Note all vercel commands should be run from within the root klimadao (monorepo) directory, all others should be run from within the carbonmark-api folder **

### Link your local copy of the project with vercel

```sh
vercel link
```

### Environment Variables

The vercel config is where all environment variables required for the project are defined and can be pulled down via the `vercel-cli`

```sh
vercel env pull --environment development
```

or

```sh
vercel env pull --environment production
```

### Install dependencies

```sh
cd carbonmark-api && npm ci
```

**Note:** You will need to manually remove the beginning and trailing quotation marks on the `FIREBASE_ADMIN_CERT` env var otherwise you will receive a _SyntaxError: Unexpected token_ error when trying to run the project

<!-- USAGE EXAMPLES -->

## Usage

### `vercel dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

### `npm run test:postman`

Run the test cases via postman

<!-- TODO Add description about deployment process -->
<!-- TODO Add description of available endpoints -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>
