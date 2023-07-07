import { getFiatBalanceUrl } from "../getFiatUrls";

interface Params {
  isProduction: boolean;
}

interface Response {
  remainingUsdc: string;
  remainingMatic: string;
}

export const getFiatWalletBalance = async (
  params: Params
): Promise<Response> => {
  try {
    const res = await fetch(
      getFiatBalanceUrl({ isProduction: params.isProduction })
    );

    if (!res.ok) {
      const { message, name } = await res.json();
      const e = new Error(message);
      e.name = name;
      throw e;
    }

    const json: Response = await res.json();
    return json;
  } catch (e) {
    console.error("getFiatWalletBalance Error", e);
    throw e;
  }
};
