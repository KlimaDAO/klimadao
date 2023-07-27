import { FastifyInstance } from "fastify";
import { map } from "lodash/fp";

import { assign } from "lodash";
import {
  FindProjectsQueryVariables,
  Listing,
  Project,
} from "src/.generated/types/marketplace.types";
import { CarbonOffset } from "src/.generated/types/offsets.types";
import { PoolPrice } from "src/utils/helpers/fetchAllPoolPrices";
import { extract, notNil } from "../../utils/functional.utils";
import {
  getAllCategories,
  getAllCountries,
  getAllVintages,
} from "../../utils/helpers/utils";
import { isListingActive } from "../../utils/marketplace.utils";
import { POOL_INFO } from "./projects.constants";

/**
 * Build a default FindProjectsQueryVariables object for searching
 * via findProjects
 * @param fastify
 * @returns
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
}: Pick<CarbonOffset, "projectID" | "vintageYear">) =>
  projectID + "-" + vintageYear;

export const buildProjectKey = ({
  registry,
  projectID,
  vintage,
}: Pick<Project, "registry" | "projectID" | "vintage">) =>
  registry + "-" + projectID + "-" + vintage;

export const getOffsetTokenPrices = (
  offset: CarbonOffset,
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

export const getListingPrices = (listings: Listing[] = []) =>
  listings.filter(isListingActive).map(extract("singleUnitPrice"));

export const composeCarbonmarkProject = (
  project: Project,
  cmsProject: any,
  price: number
) => {
  const cmsData = {
    description: cmsProject?.description,
    name: cmsProject?.name ?? project.name,
    methodologies: cmsProject?.methodologies ?? [],
    short_description: cmsProject?.projectContent?.shortDescription,
    longDescription: cmsProject?.projectContent?.longDescription,
  };

  return assign(project, cmsData, { price });
};

export const composeOffsetProject = (
  cmsData: any,
  offset: CarbonOffset,
  price: number
) => ({
  id: offset.id,
  isPoolProject: true,
  description: cmsData ? cmsData.description : undefined,
  short_description: cmsData?.projectContent
    ? cmsData.projectContent.shortDescription
    : undefined,
  key: offset.projectID,
  projectID: offset.projectID.split("-")[1],
  name: cmsData ? cmsData.name : offset.name,
  methodologies: cmsData ? cmsData.methodologies : [],
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
});
