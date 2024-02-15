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

Install the vercel CLI

```sh
npm i -g vercel
```

Run the following from the root of the repository, accepting all options and using KlimaDAO as the project scope:

```sh
vercel link -p carbonmark-api
```

### Environment Variables

Some important environment variables are stored in vercel and need to be downloaded to your machine.

```sh
# run from root klimadao folder
vercel env pull --environment=development carbonmark-api/.env.local
```



### Install dependencies


```sh
# run from the repository root
npm install
```

## Scripts

### `npm run dev`

Starts the app in dev mode with hot-reloading.

Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

### `npm start`

For production mode

### `npm build`

Compile and package a production ready version in `/dist`

### `npm run test`

Run the test cases.

### `npm run lint`

Lint and type checks.

### `npm run test:postman`

A healthcheck of all endpoints to ensure all happy paths are working.

### `npm run generate:types`

Updates generated types and mocks from the relevant subgraphs used by the API

## Releases & Versioning

### Creating a Release

To release a new version of the API increment the version number in `carbonmark-api/package.json` and `package-lock.json` by running one of these commands in the carbonmark-api folder:
- `npm version major`: Major version update (breaking changes)
- `npm version minor`: Minor version update (new functionality without breaking changes):
- `npm version patch`: Patch (backward compatible bug fix)

Then create a pull request with that change. (Note that the format of the version should follow [SemVer](https://semver.org/) conventions)

Once the pull request is merged with staging the `release_carbonmark_api` github action will: 
1. Build and deploy that version of the API under the `vX.X.X.api.carbonmark.com` domain.
2. Create a tag of the format `carbonmark-api/vX.X.X` at the merged commit.
3. Create a Github [release](https://github.com/KlimaDAO/klimadao/releases) with the title `carbonmark-api-vX.X.X` containing a change-log of all the commited changes within the `carbonmark-api` directory since the last release

Alternatively creating a new git tag of the format `carbonmark-api/vX.X.X` will also trigger a release but **make sure to update the package.json version** simultaneously when releasing this way. **This approach is not recommended**

### Domains
The root `api.carbonmark.com` domain is always running the latest version of the code on `staging`.

All previously released versions can be accessed at `vX.X.X.api.carbonmark.com`

### Creating a Hotfix

To create a hotfix on an earlier API version that customers are using, check out an earlier tag, create a branch, increment the package.json version then create a tag from that commit **ensuring that the hotfix branch is long living**.

## Reference Docs & OpenAPI Spec

Reference docs can be found at the root.
[api.carbonmark.com](https://api.carbonmark.com)

These are generated from an OpenAPI JSON spec that is auto-generated from our Fastify schemas. The raw JSON spec is not kept in source control-- it can be accessed at [api.carbonmark.com/openapi.json](https://api.carbonmark.com/openapi.json).

Fastify schemas are co-located with the respective route handlers, except for the root OpenAPI config, which is located in [src/plugins/open-api.ts](./src/plugins/open-api.ts). For more info see the @fastify/swagger plugin docs.

## Type Generation
The API leverages several [Graph](https://thegraph.com/) gql interfaces to source the data it needs for each of it's endpoints. These GraphQL servers contain their own domain objects and so to ensure type safety our interactions with them are handled through generated typescript types in `.generated` and via the `gql_sdk`.

Types should not need to be re-generated unless the subgraph that is targetted has changed (or a new one has been added). 

To re-generate:
1. Update the URLs defined in `app.constants.ts` 
2. Run `npm run generate:types` from within the `/carbonmark-api` directory
3. Create a new release following the process [defined above](#creating-a-release)


## Deployment
The deploy_carbonmark_api.yml github action:

https://github.com/KlimaDAO/klimadao/blob/staging/.github/workflows/deploy_carbonmark_api.yml

creates a deployment of the API seperate to the Vercel deployment that happens automatically on creation of a pull request.

That deployment is aliased with the commit hash of the latest commit of the target branch for the pull request. (e.b carbonmark-api-0311caba-klimadao.vercel.app)

This happens on push to the target PR branch so on the first pass of the build the aliased API does not exist yet. However, it is possible to set the `NEXT_PUBLIC_USE_PREVIEW_CARBONMARK_API` environment variable in https://vercel.com/klimadao/carbonmark/settings/environment-variables which will force carbonmark to target this preview deployment on the next build. (See: https://github.com/KlimaDAO/klimadao/blob/56bf7dff7f03e2e23d8b8d97ee9c09645c4749f8/carbonmark/lib/constants.ts#L37-L39)

## Development
It is also possible to target a local instance of the API (or any deployed version for that matter) when developing by setting the `NEXT_PUBLIC_USE_PREVIEW_CARBONMARK_API` variable when running the development script:


```sh
NEXT_PUBLIC_CARBONMARK_API_URL=http://localhost:3003 npm run dev-carbonmark
```
