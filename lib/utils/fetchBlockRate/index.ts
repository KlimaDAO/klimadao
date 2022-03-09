import { API_BASE_URL, FALLBACK_BLOCK_RATE } from "../../constants";

/** Fetch the 30 day moving average block rate from our API */
export const fetchBlockRate = async () => {
  try {
    const response = await fetch(API_BASE_URL + "/block-rate");
    const data = await response.json();
    return data.blockRate30Day;
  } catch (error) {
    console.error(error);
    return FALLBACK_BLOCK_RATE;
  }
};
