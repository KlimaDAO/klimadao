import { getSanityClient } from "lib/cms/fetchCarbonProjectsCMS";
import { Methodology } from "lib/types/carbonmark.types";

const groqAllProjects = () => /* groq */ `
  *[_type == 'project'] {
    "id": id.current,
    name,
    registry,
    registryProjectId,
    country,
    region,
    description,
    url,
    methodologies[]->{  "id": id.current, category, name },
    "projectContent": *[references(^._id)]{
      shortDescription,
      longDescription
    }[0]
  }`;

const groqProjectsByIds = (params: { ids: string }) => /* groq */ `
  *[_type == 'project' && _id in ${params.ids}] {
    "id": id.current,
    name,
    registry,
    registryProjectId,
    country,
    region,
    description,
    url,
    methodologies[]->{ "id": id.current, category, name },
    methodologies[]->{ "id": id.current, category, name },
    "projectContent": *[references(^._id)]{
      shortDescription,
      longDescription,
      images[]{
        caption,
        'url': asset->url
      }
    }[0],
    "geolocation": {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [geolocation.lng, geolocation.lat]
      }
    }
  }`;

export const queryProjects = async (
  params?: {
    ids?: string[];
  },
  locale = "en"
): Promise<ProjectCMS[]> => {
  const query = !!params?.ids
    ? groqProjectsByIds({ ids: JSON.stringify(params.ids) })
    : groqAllProjects();
  const projects = await getSanityClient().fetch(query, { locale });
  return projects;
};

export type ProjectCMS = {
  id: string; // Project ID like 'VCS-274', CAN WE ALWAYS TRUST THIS?
  name: string;
  registry: string; // e.g. 'VCS'
  registryProjectId: string; // e.g. '274'
  country: string;
  region: string;
  description: string;
  url: string;
  methodologies: Array<Methodology>;
  projectContent: {
    shortDescription: string;
    longDescription: string;
    images?: {
      caption: string;
      url: string;
    }[];
  };
  geolocation?: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
};

export interface QueryContent {
  allprojects: Document[];
}
