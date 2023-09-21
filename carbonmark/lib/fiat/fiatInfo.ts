import { urls } from "lib/constants";

interface Response {
  MAX_USDC: string;
  MIN_FIAT_CENTS: string;
}

export const getFiatInfo = async (): Promise<Response> => {
  try {
    const res = await fetch(urls.fiat.info);

    if (!res.ok) {
      const { message, name } = await res.json();
      const e = new Error(message);
      e.name = name;
      throw e;
    }

    const json: Response = await res.json();
    return json;
  } catch (e) {
    console.error("getFiatInfo Error", e);
    throw e;
  }
};
