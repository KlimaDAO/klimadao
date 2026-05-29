# Project Data CMS

Single source of truth for Methodologies and Projects.

This is a [Sanity](https://www.sanity.io/) Studio (project `l6of5nwi`, dataset `production`) deployed to [carbon-projects.sanity.studio](https://carbon-projects.sanity.studio) and consumed by the Carbonmark frontend and `carbonmark-api`.

> **Note:** Merging a schema change to `staging` does **not** update the live Studio. The change only appears in [carbon-projects.sanity.studio](https://carbon-projects.sanity.studio) after running the deployment steps below.

# Deployment

Authenticate once (opens a browser):

```
npx sanity login
```

When changes have been made to the schema, first build locally from inside this folder after running `npm install` for the top-level workspace of this repo:

```
npm run build
```

Assuming the build is successful, deploy the changes to Sanity Studio:

```
npm run deploy
```

Finally, update the Sanity GraphQL deployment:

```
npm run deploy-graphql
```

If there are breaking changes, the codegen also needs to be re-run for the main repo workspace, and any breaking schema changes need to be consumed in our gql fragments and queries here: 
- https://github.com/KlimaDAO/klimadao/blob/staging/carbonmark-api/src/graphql/cms.fragments.gql
- https://github.com/KlimaDAO/klimadao/blob/staging/carbonmark-api/src/graphql/cms.gql

# Common changes

## Adding a registry

The Registry dropdown is the `registries` array in [`schemas/project.ts`](./schemas/project.ts). Add an entry with a human-readable `title` and a short uppercase `value` code (the `value` is what gets stored and used as the `id` prefix, e.g. `UCR-432`):

```ts
const registries = [
  // ...existing entries
  { title: "Universal Carbon Registry", value: "UCR" },
];
```

Adding a value to this list does not change the GraphQL schema (`registry` is still a string), so `npm run deploy-graphql` is not required. After merging, run the deployment steps above for the option to appear in the Studio. See PRs #2437 (Regen) and #2442 (UCR) for examples.