import {
  aMethodology,
  aProject,
  aProjectContent,
} from "../../src/.generated/mocks/cms.mocks";
import { Maybe, Slug } from "../../src/.generated/types/cms.types";

const cmsProjectContent = aProjectContent({
  project: {
    registry: "VCS",
    registryProjectId: "191",
  } as any,
  shortDescription: "Short description for vcs-191",
  longDescription: "Long description for vcs-101",
});

const cmsProject = aProject({
  country: "China",
  registry: "VCS",
  registryProjectId: "191",
  region: "Asia",
  methodologies: [
    aMethodology({
      id: "ACM0002" as unknown as Maybe<Slug>, //Ugh..
      category: "Renewable Energy",
      name: "Grid-connected electricity generation from renewable sources",
    }),
  ],
});

// Generated types are wrong, id is string - https://github.com/KlimaDAO/klimadao/issues/1500
const carbonProject = {
  ...cmsProject,
  // override these because the type from aProject() is wrong
  id: "VCS-191",
  methodologies: [
    {
      id: "ACM0002",
      category: "Renewable Energy",
      name: "Grid-connected electricity generation from renewable sources",
    },
  ],
  content: cmsProjectContent,
};

/** Fixtures for queries to the carbon-projects cms */
export default {
  cmsProject,
  cmsProjectContent,
  carbonProject,
  /** Project entry in `fetchAllProjects` query */
};
