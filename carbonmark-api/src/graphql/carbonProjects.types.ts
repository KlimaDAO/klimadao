import { GetProjectQuery } from "../.generated/types/carbonProjects.types";

/** A project entry from sanity allProjects query */
export type CMSProject = GetProjectQuery["allProject"][number];
