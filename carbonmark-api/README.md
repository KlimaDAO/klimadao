<!-- PROJECT LOGO -->

<br />
<div align="center">
<a  href="https://github.com/github_username/repo_name">
<img  src="./assets/logo.png"  alt="Logo"  width="80"  height="80">
</a>
<h2 align="center">Carbonmark REST API</h2>
</div>

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
vercel link
```

### Environment Variables

Some important environment variables are stored in vercel and need to be downloaded to your machine.

### **Note:** You will need to manually remove the beginning and trailing quotation marks on the `FIREBASE_ADMIN_CERT` env var in `.env.local` otherwise you will receive a _SyntaxError: Unexpected token_ error when trying to run the project

```sh
# run from root klimadao folder
vercel env pull --environment=development .env.local
```



### Install dependencies


```sh
# run from root klimadao folder
cd  carbonmark-api && npm  ci
```

## Development

`npm run dev-carbonmark-api` to start the app in dev mode.

Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

### `npm run test:postman`

Run the test cases via postman

## Releases & Versioning

To increment the API version, create a new git tag of the format `carbonmark-api/vX.X.X` using [SemVer](https://semver.org/).
Github Actions will build and deploys that version of the API to the `vX.X.X.api.carbonmark.com` domain.

The root `api.carbonmark.com` domain is always running the latest version of the code on `main`.

Breaking changes should be documented in Github tags.

#### Hotfixes

To create a hotfix on an earlier API version that customers are using, check out an earlier tagged commit, create a branch, then tag and release a hotfix from that branch.

## Reference Docs & OpenAPI Spec

Reference docs can be found at the root.
[api.carbonmark.com](https://api.carbonmark.com)

These are generated from an OpenAPI JSON spec that is auto-generated from our Fastify schemas. The raw JSON spec is not kept in source control-- it can be accessed at [api.carbonmark.com/openapi.json](https://api.carbonmark.com/openapi.json).

Fastify schemas are co-located with the respective route handlers, except for the root OpenAPI config, which is located in [src/plugins/open-api.ts](./src/plugins/open-api.ts). For more info see the @fastify/swagger plugin docs.
