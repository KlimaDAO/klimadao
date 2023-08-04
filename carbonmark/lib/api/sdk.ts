import { User } from "carbonmark-api/src/.generated/types/marketplace.types";
import { CarbonmarkApi } from "carbonmark-api/src/routes/projects/projects.types";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { Purchase } from "lib/types/carbonmark";

const getAllProjects = async () =>
  await fetcher<CarbonmarkApi.Get.Project[]>(`${urls.api.projects}`);

const getProject = async (
  projectId: string
): Promise<CarbonmarkApi.GetById.Project> =>
  await fetcher(`${urls.api.projects}/${projectId}`);

const getUser = async (params: {
  user: string;
  type: "wallet" | "handle";
}): Promise<User> =>
  await fetcher(`${urls.api.users}/${params.user}?type=${params.type}`);

const getPurchase = async (params: { id: string }): Promise<Purchase | null> =>
  await fetcher(`${urls.api.purchases}/${params.id}`);

export const api = {
  carbonmark: {
    getAllProjects,
    getProject,
    getPurchase,
    getUser,
  },
};
