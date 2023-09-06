import { Static, Type } from "@sinclair/typebox";
import { CommonSchemaRefs, Nullable } from "../common.schema";

/** DEPRECATED. This will be altered with v2 */
const listingEntry = Type.Object(
  {
    id: Type.String({
      description: "Unique listing identifier",
    }),
    leftToSell: Type.String({
      description: "Remaining supply. Unformatted 18 decimal string",
    }),
    tokenAddress: Type.String({
      description: "Address of the asset being sold",
    }),
    singleUnitPrice: Type.String({
      description:
        "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
    }),
  },
  {
    description:
      "DEPRECATED. This resource will be altered in the near future.",
  }
);

type ListingEntry = Static<typeof listingEntry>;

const projectEntry = Type.Object({
  description: Nullable(Type.String()),
  short_description: Nullable(Type.String()),
  key: Type.String(),
  projectID: Type.String(),
  name: Type.String(),
  methodologies: Type.Array(
    Type.Object({
      id: Type.String(),
      category: Type.String(),
      name: Type.String(),
    })
  ),
  vintage: Type.String(),
  projectAddress: Type.String(),
  registry: Type.String(),
  country: Type.Object({ id: Type.String() }),
  category: Type.Object({ id: Type.String() }),
  price: Type.String(),
  updatedAt: Type.String(),
  listings: Nullable(Type.Array(listingEntry)), // null when listings are empty
  /** This should be defined in common.schema.ts but I couldn't get the URI ref to work with Type.Union */
  location: Nullable(
    Type.Object({
      type: Type.Literal("Feature"),
      geometry: Type.Object({
        type: Type.Literal("Point"),
        coordinates: Type.Tuple([Type.Number(), Type.Number()]),
      }),
    }),
    {
      description: "A GeoJSON Point feature.",
    }
  ),
  /** THE FOLLOWING FIELDS ARE TO BE DEPRECATED */
  id: Type.String({ description: "Deprecated in favor of projectAddress" }),
  isPoolProject: Type.Optional(Type.Boolean()),
});

type ProjectEntry = Static<typeof projectEntry>;

const querystring = Type.Object({
  network: Type.Optional(CommonSchemaRefs.querystring.network),
  country: Type.Optional(
    Type.String({
      description: "Desired country of origin for carbon projects",
    })
  ),
  category: Type.Optional(
    Type.String({
      description: "Desired category of carbon projects",
    })
  ),
  search: Type.Optional(
    Type.String({
      description:
        "Search carbon project names and descriptions for a string of text",
    })
  ),
  vintage: Type.Optional(
    Type.String({
      description: "Desired vintage of carbon projects",
    })
  ),
});

type QueryString = Static<typeof querystring>;

const schema = {
  summary: "List projects",
  description:
    "Retrieve an array of carbon projects filtered by desired query parameters",
  tags: ["Projects"],
  querystring,
  response: {
    200: {
      description: "List of projects",
      content: {
        "application/json": {
          schema: Type.Array(projectEntry),
        },
      },
    },
  },
};

export { ListingEntry, ProjectEntry, QueryString, schema };
