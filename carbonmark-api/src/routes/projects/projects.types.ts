// export type PoolProject = Project & CarbonOffset;

import { ProjectContent } from "src/.generated/types/carbonProjects.types";
import {
  Activity,
  Category,
  Country,
  FindProjectsQuery,
} from "src/.generated/types/marketplace.types";
import { FindCarbonOffsetsQuery } from "src/.generated/types/offsets.types";
import { ModifiedMethodology } from "src/utils/helpers/carbonProjects.utils";
import { Nullable } from "../../../../lib/utils/typescript.utils";

/** The specific CarbonOffset type from the find findCarbonOffsets query*/
export type FindQueryOffset = FindCarbonOffsetsQuery["carbonOffsets"][number];

/** The specific Project type from the find findProjects query*/
export type FindQueryProject = FindProjectsQuery["projects"][number];

// The response object for the /GET endpoint
export type GetProjectResponse = {
  id: string;
  key: string;
  isPoolProject?: boolean;
  description?: ProjectContent["longDescription"];
  short_description: ProjectContent["shortDescription"];
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
  methodologies: ModifiedMethodology[];
};
