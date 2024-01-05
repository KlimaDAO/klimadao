import {
  aCmsMethodology,
  aCmsProject,
  aCmsProjectContent,
} from "../../src/.generated/mocks/cms.mocks";
import { CmsSlug, Maybe } from "../../src/.generated/types/cms.types";

const cmsProjectContent = aCmsProjectContent({
  project: {
    registry: "VCS",
    registryProjectId: "191",
  } as any,
  shortDescription: "Short description for vcs-191",
  longDescription: "Long description for vcs-101",
});

const cmsProject = aCmsProject({
  country: "China",
  registry: "VCS",
  registryProjectId: "191",
  region: "Asia",
  id: "VCS-191" as unknown as Maybe<CmsSlug>,
  methodologies: [
    aCmsMethodology({
      id: "ACM0002" as unknown as Maybe<CmsSlug>, //Ugh..
      category: "Renewable Energy",
      name: "Grid-connected electricity generation from renewable sources",
    }),
  ],
});

/** Fixtures for queries to the carbon-projects cms */
export default {
  cmsProject,
  cmsProjectContent,
};
