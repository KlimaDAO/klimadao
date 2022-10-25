import { PledgeFormValues } from "../types";

export interface putPledgeParams {
  pledge: PledgeFormValues;
  pageAddress: string;
  signature: string;
  secondaryWalletAddress?: string;
}

export const putPledge = async (params: putPledgeParams) => {
  const res: any = await fetch("/api/pledge", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.signature}`,
    },
    body: JSON.stringify({
      pageAddress: params.pageAddress,
      pledge: params.pledge,
      secondaryWalletAddress: params.secondaryWalletAddress,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  } else {
    const data = await res.json();
    return data;
  }
};
