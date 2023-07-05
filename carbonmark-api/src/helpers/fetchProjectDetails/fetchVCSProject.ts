import { fetchProjects } from "src/sanity/queries";
import { getSanityClient } from "../../sanity/sanity";

const sanity = getSanityClient();

type Params = {
  registryProjectId: string; // Project id number `"981"`
};

const fetchVCSProject = async ({ registryProjectId }: Params) => {
  const registry = "VCS";
  const project = await sanity.fetch(fetchProjects, {
    registry,
    registryProjectId,
  });

  if (!project) return null;

  return {
    key: `${registry}-${registryProjectId}`,
    projectID: registryProjectId,
    name: project.name,
    registry,
    country: project.country,
    description: project.description ?? undefined,
    location: project.geolocation ?? undefined,
    methodologies: project.methodologies,
    images: project.projectContent?.images,
    long_description: project.projectContent?.longDescription,
    url: project.url,
  };
};

export default fetchVCSProject;
