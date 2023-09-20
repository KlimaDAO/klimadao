import { DetailedProject } from "lib/types/carbonmark.types";

import { client } from "lib/api/client";

export const getCarbonmarkProject = async (
  creditId: string,
  opts?: {
    network?: "mumbai" | "polygon";
  }
): Promise<DetailedProject | null> => {
  const res = await client["/projects/{id}"].get({
    params: { id: creditId },
    query: { network: opts?.network || "polygon" },
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
};
