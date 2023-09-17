import {
  aProject,
  aProjectContent,
} from "../../src/.generated/mocks/carbonProjects.mocks";
import { CarbonProject } from "../../src/utils/helpers/carbonProjects.utils";

const content = aProjectContent({
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
});

// Generated types are wrong, id is string - https://github.com/KlimaDAO/klimadao/issues/1500
const carbonProject: CarbonProject = {
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
  content,
};

/** Fixtures for queries to the carbon-projects cms */
const fixtures = {
  /** Project entry in `fetchAllProjects` query */
  carbonProject,
};

export default fixtures;
