import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { urls } from "lib/constants";
import { pollUntil } from "lib/pollUntil";
import {
  Category,
  CategoryName,
  Country,
  Project,
  User,
} from "lib/types/carbonmark";
import { createDownloadLink } from "./createDownloadLink";
import { fetcher } from "./fetcher";
import { notNil } from "./utils/functional.utils";

export const loginUser = async (wallet: string): Promise<{ nonce: string }> => {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.nonce) {
    throw new Error(data.message);
  }
  return data;
};

export const verifyUser = async (params: {
  address: string;
  signature: string;
}): Promise<{ token: string }> => {
  const res = await fetch("/api/users/login/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet: params.address,
      signature: params.signature,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.token) {
    throw new Error(data.message);
  }
  return data;
};

export const putUser = async (params: {
  user: User;
  token: string;
}): Promise<User> => {
  const res = await fetch(`/api/users/${params.user.wallet}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const postUser = async (params: {
  user: User;
  token: string;
}): Promise<User> => {
  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const getUser = async (params: {
  user: string;
  type: "wallet" | "handle";
}): Promise<User> => {
  const result = await fetch(`/api/users/${params.user}?type=${params.type}`);

  const data = await result.json();

  if (!result.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const getRetirements = async (params: {
  beneficiaryAddress: string;
  limit?: number;
}): Promise<KlimaRetire[] | false> => {
  const result = await fetch(
    `/api/retirements/${params.beneficiaryAddress}?limit=${params.limit}`
  );
  const data = await result.json();

  if (!result.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const getRetirementCertificate = async (params: {
  beneficiaryName: string;
  beneficiaryAddress: string;
  retirementIndex: string;
}) => {
  const filename = `retirement_${params.retirementIndex}_${params.beneficiaryAddress}.pdf`;
  try {
    const result = await fetch(
      `/api/certificates/${params.beneficiaryAddress}/${params.retirementIndex}`
    );
    if (!result.ok) {
      throw new Error(await result.text());
    }
    await createDownloadLink(await result.blob(), filename);
  } catch (error) {
    console.log("Error occurred downloading retirement certificate", error);
  }
};

// poll until check for activity timeStamps
export const activityIsAdded = (prevTimeStamp: string) => (newUser: User) => {
  const latestActivity = newUser.activities.sort(
    (a, b) => Number(b.timeStamp) - Number(a.timeStamp)
  )[0];

  return Number(latestActivity?.timeStamp || 0) > Number(prevTimeStamp);
};

export const getUserUntil = async (params: {
  address: string;
  retryUntil: (u: User) => boolean;
  maxAttempts?: number;
  retryInterval?: number;
}): Promise<User> => {
  const fetchUser = () =>
    getUser({
      user: params.address,
      type: "wallet",
    });

  const updatedUser = await pollUntil({
    fn: fetchUser,
    validate: params.retryUntil,
    ms: params.retryInterval || 1000,
    maxAttempts: params.maxAttempts || 50,
  });

  return updatedUser;
};

type GetProjectParams = {
  search?: string;
  country?: string;
  category?: CategoryName;
  vintage?: string;
};

export const getProjects = async (
  params?: GetProjectParams
): Promise<Project[]> => {
  let url = urls.api.projects;
  if (notNil(params)) url += new URLSearchParams(params);
  return await fetcher(url);
};

export const getProject = async (projectId: string): Promise<Project> =>
  await fetcher(`${urls.api.projects}/${projectId}`);

export const getCategories = async (): Promise<Category[]> =>
  await fetcher(urls.api.categories);

export const getCountries = async (): Promise<Country[]> =>
  await fetcher(urls.api.countries);

export const getVintages = async (): Promise<string[]> =>
  await fetcher(urls.api.vintages);
