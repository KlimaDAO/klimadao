import { DetailedProject } from "lib/types/carbonmark.types";

import { client } from "lib/api/client";

export const getCarbonmarkProject = async (params: {
  id: string;
  network?: "mumbai" | "polygon";
}): Promise<DetailedProject | null> => {
  const res = await client["/projects/{id}"].get({
    params: { id: params.id },
    query: { network: params.network },
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
};
