import swagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import fp from "fastify-plugin";
import packageJson from "../../package.json";

export const ProjectType = {
  type: "object",
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    projectID: { type: "string" },
    name: { type: "string" },
    methodology: { type: "string" },
    vintage: { type: "string" },
    projectAddress: { type: "string" },
    registry: { type: "string" },
    country: { type: "string" },
    category: { type: "string" },
    price: { type: "string" },
  },
} as const;

const OPEN_API_OPTIONS: FastifyDynamicSwaggerOptions["openapi"] = {
  info: {
    title: "Carbonmark REST API",
    description: `
Welcome to the API Reference docs for **version ${packageJson.version}** of the Carbonmark REST API. Use this API to view assets, prices, supply, activity and more.
## Quick start
⚠️Be sure to prefix a version number, otherwise your application will be exposed to breaking changes.

~~~ts
const res = await fetch("https://v1.api.carbonmark.com/api/projects");
const projects = await res.json();
~~~

For a developer guides and example implementations, or to learn more about Carbonmark and Digital Carbon Market, view our product knowledge base at <a href="https://docs.carbonmark.com">docs.carbonmark.com</a>.
## 
`,
    termsOfService: "https://www.carbonmark.com/blog/terms-of-use",
    contact: {
      name: "Support",
      url: "https://share-eu1.hsforms.com/1RWJWvyrHT1C_an4cZOHH3gfhhlr",
      // email: "support@carbonmark.com",
    },
    license: {
      name: "MIT",
      url: "https://github.com/KlimaDAO/klimadao/blob/main/LICENSE",
    },
    /** The API version */
    version: packageJson.version,
  },
  components: {
    schemas: {
      Project: ProjectType,
    },
  },
  externalDocs: {
    url: "https://docs.carbonmark.com/",
    description:
      "Additional documentation. The complete product and platform knowledge base for Carbonmark can be found here.",
  },
};

export default fp(async function (fastify) {
  await fastify.register(swagger, {
    openapi: OPEN_API_OPTIONS,
  });
});
