import { DetailedProject, TokenPrice } from "lib/types/carbonmark.types";

// type ProjectData = {
//   key: Project["key"];
//   vintage: Project["vintage"];
//   serialization?: Project["serialization"];
// };

// // @todo clean up this workaround
// export const toProjectData = (project: DetailedProject): ProjectData => ({
//   key: project.key,
//   vintage: project.vintage,
//   serialization: project.serialization ?? undefined, // Convert null to undefined
// });

export const createProjectLink = (projectData: DetailedProject) => {
  if (projectData.key.startsWith("ICR") && projectData.serialization) {
    return `/projects/${projectData.serialization}`;
  } else {
    return `/projects/${projectData.key}-${projectData.vintage}`;
  }
};

export const createProjectPurchaseLink = (
  project: DetailedProject,
  listingId: string
) => `${createProjectLink(project)}/purchase/${listingId}`;

export const createProjectPoolRetireLink = (
  project: DetailedProject,
  pool: TokenPrice["poolName"]
) => `${createProjectLink(project)}/retire/pools/${pool.toLowerCase()}`;

export const createSellerLink = (handle: string) => `/users/${handle}`;

export const createProjectPoolPurchaseLink = (
  project: DetailedProject,
  pool: TokenPrice["poolName"]
) => `${createProjectLink(project)}/purchase/pools/${pool}`;
