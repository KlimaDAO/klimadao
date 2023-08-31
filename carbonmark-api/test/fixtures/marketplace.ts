import {
  aListing,
  aProject,
} from "../../src/.generated/mocks/marketplace.mocks";

const listing = aListing({
  singleUnitPrice: "99000000",
});

const projectWithListing = aProject({
  projectID: "191",
  registry: "VCS",
  listings: [listing],
  vintage: "2008",
  key: "VCS-191",
});

/** Fixtures for the marketplace subgraph */
const fixtures = {
  projectWithListing,
};

export default fixtures;
