# Project Data CMS

Single source of truth for Methodologies and Projects

# Deployment

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

Assuming there are breaking changes, the codegen also needs to be re-run for the main repo workspace, and any breaking schema changes need to be consumed in our gql fragments and queries here: 
- https://github.com/KlimaDAO/klimadao/blob/staging/carbonmark-api/src/graphql/cms.fragments.gql
- https://github.com/KlimaDAO/klimadao/blob/staging/carbonmark-api/src/graphql/cms.gql