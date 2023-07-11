import { urls } from "lib/constants";

interface Response {
  remainingUsdc: string;
  remainingMatic: string;
}

export const getFiatWalletBalance = async (): Promise<Response> => {
  try {
    const res = await fetch(urls.fiat.balance);

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
