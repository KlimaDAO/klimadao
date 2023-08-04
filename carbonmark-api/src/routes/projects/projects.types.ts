// export type PoolProject = Project & CarbonOffset;

import { GetPoolPricesQuery } from "src/.generated/types/tokens.types";
import { Nullable } from "../../../../lib/utils/typescript.utils";
import {
  GetProjectQuery,
  Image,
  Methodology,
  ProjectContent,
} from "../../.generated/types/carbonProjects.types";
import {
  Activity,
  Category,
  Country,
  FindProjectsQuery,
} from "../../.generated/types/marketplace.types";
import { FindCarbonOffsetsQuery } from "../../.generated/types/offsets.types";

/** The specific CarbonOffset type from the find findCarbonOffsets query*/
export type FindQueryOffset = FindCarbonOffsetsQuery["carbonOffsets"][number];

/** The specific Project type from the find findProjects query*/
export type FindQueryProject = FindProjectsQuery["projects"][number];

export namespace CarbonmarkApi {
  export namespace Get {
    export type Project = {
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
    };
  }
  export namespace GetById {
    export type Project = {
      key: string;
      projectID: string;
      name: string | "";
      methodologies: Array<Methodology>;
      vintage: string;
      images: Array<Image>;
      projectAddress: string;
      registry: string;
      listings: FindProjectsQuery["projects"][number]["listings"][] | null;
      /** Lowest price across pools and listings, formatted string e.g. "0.123456" */
      price: string;
      country: string | null;
      activities: Activity[] | null;
      updatedAt: string; // timestamp
      location?: {
        // only defined for Verra projects
        type: "Feature";
        geometry: {
          type: "Point";
          coordinates: [number, number];
        };
      };
      description?: string;
      short_description?: string;
      long_description?: string;
      isPoolProject?: boolean; // pool project only
      stats: {
        totalSupply: number;
        totalBridged: number;
        totalRetired: number;
      };
      prices?: GetPoolPricesQuery[];
      url: string;
      methodologyCategory: Methodology;
    };
  }
}
