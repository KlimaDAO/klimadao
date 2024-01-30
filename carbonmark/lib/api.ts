import { getUsersWalletorhandle } from ".generated/carbonmark-api-sdk/clients";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { urls } from "lib/constants";
import { pollUntil } from "lib/pollUntil";
import { User } from "lib/types/carbonmark.types";
import { createDownloadLink } from "./createDownloadLink";

export const putUser = async (params: {
  user: User;
  signature: string;
}): Promise<User> => {
  const res = await fetch(`${urls.api.users}/${params.user.wallet}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
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
  signature: string;
}): Promise<User> => {
  const res = await fetch(urls.api.users, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
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
    console.error("Error occurred downloading retirement certificate", error);
  }
};

// poll until check for activity timeStamps
export const activityIsAdded = (prevTimeStamp: string) => (newUser: User) => {
  const latestActivity = newUser.activities?.sort(
    (a, b) => Number(b.timeStamp) - Number(a.timeStamp)
  )[0];
  return Number(latestActivity?.timeStamp || 0) > Number(prevTimeStamp);
};

export const getUserUntil = async (params: {
  address: string;
  retryUntil: (u: User) => boolean;
  maxAttempts?: number;
  retryInterval?: number;
  network?: "mumbai" | "polygon";
}): Promise<User> => {
  const fetchUserData = async () =>
    await getUsersWalletorhandle(params.address, {
      network: params.network,
      expiresAfter: "0",
    });

  const updatedUser = await pollUntil({
    fn: fetchUserData,
    validate: params.retryUntil,
    ms: params.retryInterval || 1000,
    maxAttempts: params.maxAttempts || 50,
  });

  return updatedUser;
};
