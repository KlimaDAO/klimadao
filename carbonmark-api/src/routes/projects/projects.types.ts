// export type PoolProject = Project & CarbonOffset;

import {
  GetProjectQuery,
  Image,
  Maybe,
  ProjectContent,
} from "src/.generated/types/carbonProjects.types";
import {
  Activity,
  Category,
  Country,
  FindProjectsQuery,
  Listing,
} from "src/.generated/types/marketplace.types";
import { FindCarbonOffsetsQuery } from "src/.generated/types/offsets.types";
import { ActivityWithUserHandles } from "src/utils/helpers/fetchMarketplaceListings";
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
  methodologies?: GetProjectQuery["allProject"][number]["methodologies"];
  location?: {
    // only defined for Verra projects
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  images?: Maybe<Image>[];
};

export type GetProjectByIdResponse = {
  key: string;
  projectID?: string | null;
  name?: string | null;
  registry?: string | null;
  country?: string | null;
  description?: string | null;
  methodologies?: GetProjectQuery["allProject"][number]["methodologies"];
  location?: {
    // only defined for Verra projects
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  long_description?: string | null;
  url?: string | null;
  stats: {
    totalBridged: number;
    totalRetired: number;
    totalSupply: number;
  };
  /** Lowest price across pools and listings, formatted string e.g. "0.123456" */
  price: string;
  prices: {
    poolName: string;
    supply: string;
    poolAddress: string;
    isPoolDefault: boolean;
    projectTokenAddress: string;
    singleUnitPrice: string;
  }[];
  isPoolProject: boolean;
  vintage: string;
  listings: Omit<Listing, "project">[] | null;
  activities: ActivityWithUserHandles[] | null;
};
