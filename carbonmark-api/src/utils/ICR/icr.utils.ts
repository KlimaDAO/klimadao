import type { IcrProject } from "../ICR/icr.types";
import { ICR_API } from "./ICR_API_endpoints";

export const convertIcrCountryCodeToName = (code: string) => {
  if (!code) return;
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const country = regionNames.of(code);
  return country;
};

export const fetchAllICRProjects = async (
  network: "polygon" | "mumbai"
): Promise<IcrProject[]> => {
  const { ICR_API_URL, ICR_API_KEY } = ICR_API(network);

  const response = await fetch(ICR_API_URL + "/public/projects/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ICR_API_KEY}`,
    },
  });

  const data = await response.json();

  // remove any projects with no associated carbon credits
  const IcrListProjects: IcrProject[] = data.projects.filter(
    (project: IcrProject) => project.carbonCredits.length > 0
  );

  return IcrListProjects;
};
