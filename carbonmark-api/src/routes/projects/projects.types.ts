import { CMSProject } from "../../graphql/carbonProjects.types";
import {
  ByIdProjectActivity,
  ByIdProjectListing,
} from "../../graphql/marketplace.types";

type WithHandle<T> = T & { handle?: string };

/** Final project.listings response can include seller handle from firebase */
export type ListingWithUserHandles = Omit<ByIdProjectListing, "seller"> & {
  seller: WithHandle<ByIdProjectListing["seller"]>;
};

/** Final project.activities response can include user handles from firebase */
export type ActivityWithUserHandles = Omit<
  ByIdProjectActivity,
  "seller" | "buyer"
> & {
  seller: WithHandle<ByIdProjectActivity["seller"]>;
  buyer?: WithHandle<ByIdProjectActivity["buyer"]> | null;
};

export type GetProjectByIdResponse = {
  key: string;
  projectID: string | null | undefined;
  name?: string | null;
  registry?: string | null;
  country?: string | null;
  description?: string | null;
  methodologies?: CMSProject["methodologies"];
  location?: {
    // only defined for Verra projects
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  } | null;
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
  listings: ListingWithUserHandles[] | null;
  activities: ActivityWithUserHandles[] | null;
  images?: {
    url: string;
    caption: string;
  }[];
};
