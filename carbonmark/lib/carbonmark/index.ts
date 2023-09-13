import { DetailedProject } from "lib/types/carbonmark.types";

import { client } from "lib/api/client";

export const getCarbonmarkProject = async (
  id: string
): Promise<DetailedProject> =>
  await (await client["/projects/{id}"].get({ params: { id } })).json();
