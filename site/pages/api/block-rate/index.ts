import { getBlockRate } from "lib/getBlockRate";
import { NextApiRequest, NextApiResponse } from "next/types";

type ResponseData = {
  blockRate30Day?: string;
};
interface ErrorObj {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorObj>
) {
  try {
    // share-cache after last cached request:
    // 0-12 hours -> fresh, return from cache
    // 12-24 hours -> stale, return from cache but revalidate in background
    // >24 hours -> stale, recalculate & return fresh value
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=43200, stale-while-revalidate=43200"
    );

    const blockRate = await getBlockRate();
    res.status(200).json({ blockRate30Day: blockRate.toFixed(4) });
  } catch (err) {
    res.status(500).json({ message: "failed to fetch data" });
  }
}
