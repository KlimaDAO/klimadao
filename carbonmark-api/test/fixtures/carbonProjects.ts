import {
  aProject,
  aProjectContent,
} from "../../src/.generated/mocks/carbonProjects.mocks";

const projectContent = aProjectContent({
  project: {
    registry: "VCS",
    registryProjectId: "191",
  } as any,
  shortDescription: "Short description for vcs-191",
  longDescription: "Long description for vcs-101",
});

const project = aProject({
  country: "China",
  registry: "VCS",
  registryProjectId: "191",
});

// Generated types are wrong, id is string - https://github.com/KlimaDAO/klimadao/issues/1500
const carbonProject = {
  ...project,
  // override these because the type from aProject() is wrong
  id: "VCS-191",
  methodologies: [
    {
      id: "ACM0002",
      category: "Renewable Energy",
      name: "Grid-connected electricity generation from renewable sources",
    },
  ],
  content: projectContent,
};

/** Fixtures for queries to the carbon-projects cms */
const fixtures = {
  projectContent,
  project,
  /** Project entry in `fetchAllProjects` query */
  carbonProject,
};

export default fixtures;
