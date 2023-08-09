// export type PoolProject = Project & CarbonOffset;

import {
  Activity,
  Category,
  Country,
  FindProjectsQuery,
} from "src/.generated/types/marketplace.types";
import { FindCarbonOffsetsQuery } from "src/.generated/types/offsets.types";
import { Nullable } from "../../../../lib/utils/typescript.utils";

/** The specific CarbonOffset type from the find findCarbonOffsets query*/
export type FindQueryOffset = FindCarbonOffsetsQuery["carbonOffsets"][number];

/** The specific Project type from the find findProjects query*/
export type FindQueryProject = FindProjectsQuery["projects"][number];

// The response object for the /GET endpoint
export type GetProjectResponse = {
  id: string;
  isPoolProject?: boolean;
  description: string;
  short_description: string;
  key: string;
  projectID: string;
  name: string;
  vintage: string;
  projectAddress: string;
  registry: string;
  updatedAt?: string;
  price?: Nullable<string>;
  category?: Nullable<Category>;
  country?: Nullable<Country>;
  activities?: Nullable<Activity[]>;
  listings?: FindProjectsQuery["projects"][number]["listings"];
  methodologies: {
    id: string;
    category: string;
    name: string;
  }[];
  location?: {
    // only defined for Verra projects
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  images?: {
    url: string;
    caption: string;
  }[];
};
