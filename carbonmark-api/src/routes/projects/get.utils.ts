import { compact, curry, min } from "lodash";
import { FindProjectsQuery } from "../../.generated/types/marketplace.types";
import { FindCarbonOffsetsQuery } from "../../.generated/types/offsets.types";
import { extract, notNil } from "../../utils/functional.utils";
import { CarbonProject } from "../../utils/helpers/carbonProjects.utils";
import { PoolPrice } from "../../utils/helpers/fetchAllPoolPrices";
import { isMatchingCmsProject } from "../../utils/helpers/utils";
import { isListingActive } from "../../utils/marketplace.utils";
import { GetProjectResponse } from "./projects.types";
import {
  composeCarbonmarkProject,
  composeOffsetProject,
  getOffsetTokenPrices,
} from "./projects.utils";

export const validProject = ({ price }: GetProjectResponse) =>
  notNil(price) && parseFloat(price) > 0;

type MarketplaceProject = FindProjectsQuery["projects"][number];

export const marketplaceProjectToCarbonmarkProject = (
  project: MarketplaceProject,
  cmsProjects: CarbonProject[]
) => {
  const cmsProject = cmsProjects.find(
    curry(isMatchingCmsProject)({
      projectId: project.projectID,
      registry: project.registry,
    })
  );

  // Find the lowest price
  // @todo change to number[]
  const listingPrices = compact(project.listings)
    .filter(isListingActive)
    .map(extract("singleUnitPrice"));

  const lowestPrice = min(listingPrices);

  return composeCarbonmarkProject(project, cmsProject, lowestPrice);
};

type OffsetProject = FindCarbonOffsetsQuery["carbonOffsets"][number];

export const offsetProjectToCarbonmarkProject = (
  offset: OffsetProject,
  cmsProjects: CarbonProject[],
  poolPrices: Record<string, PoolPrice>
) => {
  const [registry, code] = offset.projectID.split("-");

  const cmsProject = cmsProjects.find(
    curry(isMatchingCmsProject)({ projectId: code, registry })
  );

  // Find the lowest price
  // @todo change to number[]
  const tokenPrices = getOffsetTokenPrices(offset, poolPrices);
  const lowestPrice = min(tokenPrices);

  return composeOffsetProject(offset, cmsProject, lowestPrice);
};
