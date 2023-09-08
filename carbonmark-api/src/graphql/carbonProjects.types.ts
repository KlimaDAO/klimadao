import { GetProjectQuery } from "src/.generated/types/carbonProjects.types";

/** A project entry from sanity allProjects query */
export type CMSProject = GetProjectQuery["allProject"][number];
