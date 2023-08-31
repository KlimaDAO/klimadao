/**
 * Response from sanity from carbon-projects CMS
 * See `fetchAllProjects` query in src/sanity/queries.ts
 */
const project = {
  id: "VCS-191",
  description:
    "The Dayingjiang-3 Hydropower Project Phases 1&2 is a renewable energy project with a total installed capacity of 200 MW. The project is located in Yingjiang County, Dehong Prefecture, Yunnan Province, P.R. China, and aims to generate electricity by utilizing the water resources of the Daying River.",
  registry: "VCS",
  registryProjectId: "191",
  methodologies: [
    {
      id: "AMS-ID",
      category: "Renewable Energy",
      name: "Grid connected renewable electricity generation",
    },
  ],
  name: "4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
  projectContent: {
    shortDescription:
      "The Dayingjiang-3 Hydropower Project Phases 1&2 is a renewable energy project with a total installed capacity of 200 MW. The project is located in Yingjiang County, Dehong Prefecture, Yunnan Province, P.R. China, and aims to generate electricity by utilizing the water resources of the Daying River.",
    longDescription:
      "The Dayingjiang-3 Hydropower Project Phases 1&2 is a renewable energy project with a total installed capacity of 200 MW. The project is located in Yingjiang County, Dehong Prefecture, Yunnan Province, P.R. China, and aims to generate electricity by utilizing the water resources of the Daying River.",
  },
};

/** Fixtures for queries to the carbon-projects cms */
const fixtures = {
  /** Project entry in `fetchAllProjects` query */
  project,
};

export default fixtures;
