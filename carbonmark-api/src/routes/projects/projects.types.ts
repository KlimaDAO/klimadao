import { CategorySchema } from "src/.generated/schema/marketplace.schema";
import { FindProjectsQuery } from "src/.generated/types/marketplace.types";
import { FindCarbonOffsetsQuery } from "src/.generated/types/offsets.types";

/** The specific CarbonOffset type from the find findCarbonOffsets query*/
export type FindQueryOffset = FindCarbonOffsetsQuery["carbonOffsets"][number];

/** The specific Project type from the find findProjects query*/
export type FindQueryProject = FindProjectsQuery["projects"][number];

import { Type } from "@fastify/type-provider-typebox";

export const GetAllResponse = Type.Object({
  id: Type.String(),
  key: Type.String(),
  projectID: Type.String(),
  name: Type.String(),
  methodology: Type.String(),
  vintage: Type.String(),
  projectAddress: Type.String(),
  registry: Type.String(),
  country: Type.String(),
  category: Type.String(),
  price: Type.String(),
});

export const GetAllArgs = Type.Object({
  country: Type.Optional(Type.String()),
  category: Type.Optional(Type.String()),
  search: Type.Optional(Type.String()),
  vintage: Type.Optional(Type.String()),
});

import { z } from "zod";

// The response object for the /GET endpoint
export const GetProjectResponse = z.object({
  id: z.string(),
  isPoolProject: z.boolean().optional(),
  description: z.string(),
  short_description: z.string(),
  key: z.string(),
  projectID: z.string(),
  name: z.string(),
  vintage: z.string(),
  projectAddress: z.string(),
  registry: z.string(),
  updatedAt: z.string().optional(),
  price: z.string().nullable().optional(),
  category: CategorySchema().nullable().optional(),
  country: z.nativeEnum(Country).nullable().optional(),
  activities: z.array(z.nativeEnum(Activity)).nullable().optional(),
  listings: z
    .array(FindProjectsQuery["projects"][number]["listings"])
    .optional(),
  methodologies: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
      name: z.string(),
    })
  ),
});
