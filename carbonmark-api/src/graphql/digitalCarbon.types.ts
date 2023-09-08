import { FindDigitalCarbonProjectsQuery } from "src/.generated/types/digitalCarbon.types";

/** The specific CarbonOffset type from the find findDigitalCarbon query*/
export type FindQueryDigitalCarbon =
  FindDigitalCarbonProjectsQuery["carbonProjects"][number];
