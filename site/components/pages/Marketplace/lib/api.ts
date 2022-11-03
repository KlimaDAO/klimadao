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
}): Promise<{ nonce: string }> => {
  const res = await fetch("/api/marketplace/users/login/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
    },
    body: JSON.stringify({
      wallet: params.address,
      signature: params.signature,
    }),
  });

  const data = await res.json();

  if (res.status !== 200 || !data.handle) {
    throw new Error(data.message);
  }
  return data;
};

export const putUser = async (params: {
  user: User;
  signature: string;
}): Promise<User> => {
  const res = await fetch(`/api/marketplace/users/${params.user.wallet}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
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
  signature: string;
}): Promise<User> => {
  const res = await fetch(`/api/marketplace/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};
