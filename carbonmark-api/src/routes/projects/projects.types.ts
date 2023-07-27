// export type PoolProject = Project & CarbonOffset;

import { Category, Country } from "src/.generated/types/marketplace.types";
import { Nullable } from "../../../../lib/utils/typescript.utils";

export type PoolProject = { isPoolProject?: boolean };

// The response object for the /GET endpoint
export type GetProjectResponse = {
  id: string;
  isPoolProject: boolean;
  description: string;
  short_description: string;
  key: string;
  projectID: string;
  name: string;
  vintage: string;
  projectAddress: string;
  registry: string;
  updatedAt: string;
  category: Nullable<Category>;
  country: Nullable<Country>;
  price: number;
  activities: null;
  listings: null;
  methodologies: {
    id: string;
    category: string;
    name: string;
  }[];
};
