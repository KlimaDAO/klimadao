import { FastifyInstance } from "fastify";
import { map } from "lodash/fp";

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
  cmsProject: CarbonProject,
  price: string | undefined
) => {
  const cmsData = {
    description: cmsProject?.description,
    name: cmsProject?.name ?? project.name,
    methodologies: cmsProject?.methodologies ?? [],
    short_description: cmsProject?.content?.shortDescription,
    longDescription: cmsProject?.content?.longDescription,
  };

  const result: GetProjectResponse = {
    ...project,
    ...cmsData,
    price,
  };

  return result;
};

export const composeOffsetProject = (
  carbonProject: CarbonProject,
  offset: FindQueryOffset,
  price: string | undefined
): GetProjectResponse => ({
  id: offset.id,
  description: carbonProject.description,
  short_description: carbonProject?.content?.shortDescription,
  key: offset.projectID,
  projectID: offset.projectID.split("-")[1],
  name: carbonProject.name ?? offset.name,
  methodologies: carbonProject.methodologies ?? [],
  vintage: offset.vintageYear,
  projectAddress: offset.tokenAddress,
  registry: offset.projectID.split("-")[0],
  updatedAt: offset.lastUpdate,
  category: {
    id: offset.methodologyCategory,
  },
  country: notNil(offset.country) ? { id: offset.country } : null,
  activities: null,
  listings: null,
  // New attributes
  isPoolProject: true,
  price,
});
