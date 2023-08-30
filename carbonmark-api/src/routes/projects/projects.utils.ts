import { FastifyInstance } from "fastify";
import { map } from "lodash/fp";

import { isNil, merge } from "lodash";
import { Geopoint } from "src/.generated/types/carbonProjects.types";
import { FindProjectsQueryVariables } from "src/.generated/types/marketplace.types";
import { CarbonProject } from "src/utils/helpers/carbonProjects.utils";
import { PoolPrice } from "src/utils/helpers/fetchAllPoolPrices";
import { extract, notNil } from "../../utils/functional.utils";
import {
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";
import { POOL_INFO } from "./projects.constants";
import {
  FindQueryOffset,
  FindQueryProject,
  GetProjectResponse,
} from "./projects.types";

/**
 * Build a default FindProjectsQueryVariables object for searching
 * via findProjects
 * @param fastify
 * @returns
 *
 * # @todo these "first:1000" will possibly miss results if there are more than 1000
 * # this will cause a silent error. GQL Resolver needs to be updated to allow null search params
 * # to return all possible values
 */
export const getDefaultQueryArgs = async (
  fastify: FastifyInstance
): Promise<FindProjectsQueryVariables> => {
  //Fetch all possible parameter values
  const [category, country, vintage] = await Promise.all([
    getAllCategories(fastify).then(map(extract("id"))),
    getAllCountries(fastify).then(map(extract("id"))),
    getAllVintages(fastify),
  ]);

  return {
    category,
    country,
    vintage,
    search: "",
  };
};

export const buildOffsetKey = ({
  projectID,
  vintageYear,
}: Pick<FindQueryOffset, "projectID" | "vintageYear">) =>
  projectID + "-" + vintageYear;

export const buildProjectKey = ({
  registry,
  projectID,
  vintage,
}: Pick<FindQueryProject, "registry" | "projectID" | "vintage">) =>
  registry + "-" + projectID + "-" + vintage;

export const getOffsetTokenPrices = (
  offset: FindQueryOffset,
  poolPrices: Record<string, PoolPrice>
) => {
  const prices: string[] = [];
  if (parseFloat(offset.balanceUBO) >= 1) {
    const isDefault =
      POOL_INFO.ubo.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.ubo[priceKey]);
  }
  if (parseFloat(offset.balanceNBO) >= 1) {
    const isDefault =
      POOL_INFO.nbo.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nbo[priceKey]);
  }
  if (parseFloat(offset.balanceNCT) >= 1) {
    const isDefault =
      POOL_INFO.nct.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nct[priceKey]);
  }
  if (parseFloat(offset.balanceBCT) >= 1) {
    const isDefault =
      POOL_INFO.bct.defaultProjectTokenAddress.toLowerCase() ===
      offset.tokenAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.bct[priceKey]);
  }
  return prices;
};

export const composeCarbonmarkProject = (
  project: FindQueryProject,
  carbonProject?: CarbonProject,
  price?: string
) => {
  const cmsData = {
    description: carbonProject?.description,
    name: carbonProject?.name ?? project.name,
    methodologies: carbonProject?.methodologies ?? [],
    short_description: carbonProject?.content?.shortDescription,
    longDescription: carbonProject?.content?.longDescription,
  };

  const result: GetProjectResponse = merge(project, cmsData, price);

  return result;
};

export const composeOffsetProject = (
  offset: FindQueryOffset,
  carbonProject?: CarbonProject,
  price?: string
): GetProjectResponse => ({
  id: offset.id,
  // New attribute
  isPoolProject: true,
  description: carbonProject?.description,
  short_description: carbonProject?.content?.shortDescription,
  key: offset.projectID,
  projectID: offset.projectID.split("-")[1],
  name: carbonProject?.name ?? offset.name,
  methodologies: carbonProject?.methodologies ?? [],
  location: toGeoJSON(carbonProject?.geolocation),
  vintage: offset.vintageYear,
  projectAddress: offset.tokenAddress,
  registry: offset.projectID.split("-")[0],
  updatedAt: offset.lastUpdate,
  category: {
    id: offset.methodologyCategory,
  },
  country: notNil(offset.country) ? { id: offset.country } : null,
  price,
  activities: null,
  listings: null,
  images: carbonProject?.content?.images ?? [],
});

export const toGeoJSON = (
  point?: Geopoint | null
): GetProjectResponse["location"] => {
  if ([point?.lat, point?.lng].some(isNil)) return undefined;
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- null case is caught above
      coordinates: [point!.lng!, point!.lat!],
    },
  };
};
