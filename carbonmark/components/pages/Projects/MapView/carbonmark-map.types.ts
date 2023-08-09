import { Project } from "lib/types/carbonmark";
import Supercluster from "supercluster";

export type CarbonmarkMapOpts = Omit<mapboxgl.MapboxOptions, "container"> & {
  points: Supercluster.PointFeature<{ project: Project }>[];
};

export type CarbonmarkMapProjectDetails = Pick<
  Project,
  "projectID" | "price" | "short_description" | "images" | "url"
>;
