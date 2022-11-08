import { User } from "@klimadao/lib/types/marketplace";

export const loginUser = async (wallet: string): Promise<{ nonce: string }> => {
  const res = await fetch("/api/marketplace/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const verifyUser = async (params: {
  address: string;
  signature: string;
}): Promise<{ token: string }> => {
  const res = await fetch("/api/marketplace/users/login/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet: params.address,
      signature: params.signature,
    }),
  });

  console.log("verifyUser", res);

  try {
    const data = await res.json();
    if (res.status !== 200 || !data.token) {
      console.log("data", data);
      throw new Error(data.message);
    }
    return data;
  } catch (e) {
    console.error("Error verifyUser", e);
    throw new Error("Error verifyUser");
  }
};

export const putUser = async (params: {
  user: User;
  token: string;
}): Promise<User> => {
  const res = await fetch(`/api/marketplace/users/${params.user.wallet}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const postUser = async (params: {
  user: User;
  token: string;
}): Promise<User> => {
  const res = await fetch(`/api/marketplace/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};
