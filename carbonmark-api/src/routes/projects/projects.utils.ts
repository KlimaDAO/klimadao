import { FastifyInstance } from "fastify";
import { map } from "lodash/fp";

import {
  FindProjectsQueryVariables,
  Listing,
  Project,
} from "src/.generated/types/marketplace.types";
import { CarbonOffset } from "src/.generated/types/offsets.types";
import { PoolPrice } from "src/utils/helpers/fetchAllPoolPrices";
import { extract } from "../../utils/functional.utils";
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

/** Is the offset project the same project as sourced from carbonmark */
export const isMatchingProject = (
  offset: Partial<CarbonOffset>,
  project: Project
) => offset.projectID + "-" + offset.vintageYear === buildProjectKey(project);

/**
 * Extract the token prices from CarbonOffsets
 * @todo refactor and clean this up
 */
export const getTokenPrices = (
  offset: CarbonOffset,
  project: Project,
  poolPrices: Record<string, PoolPrice>
) => {
  const prices: string[] = [];
  if (parseFloat(offset.balanceUBO) >= 1) {
    const isDefault =
      POOL_INFO.ubo.defaultProjectTokenAddress.toLowerCase() ===
      project?.projectAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.ubo[priceKey]);
  }
  if (parseFloat(offset.balanceNBO) >= 1) {
    const isDefault =
      POOL_INFO.nbo.defaultProjectTokenAddress.toLowerCase() ===
      project?.projectAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nbo[priceKey]);
  }
  if (parseFloat(offset.balanceNCT) >= 1) {
    const isDefault =
      POOL_INFO.nct.defaultProjectTokenAddress.toLowerCase() ===
      project?.projectAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.nct[priceKey]);
  }
  if (parseFloat(offset.balanceBCT) >= 1) {
    const isDefault =
      POOL_INFO.bct.defaultProjectTokenAddress.toLowerCase() ===
      project?.projectAddress.toLowerCase();
    const priceKey = isDefault ? "defaultPrice" : "selectiveRedeemPrice";
    prices.push(poolPrices.bct[priceKey]);
  }

  return prices;
};

export const getListingPrices = (listings: Listing[] = []) =>
  listings.filter(isListingActive).map(extract("singleUnitPrice"));
