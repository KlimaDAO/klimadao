import { NextApiRequest, NextApiResponse } from "next/types";
import { getKlimaSupply } from "@klimadao/lib/utils";

/** CORS is set in next.config.js */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const supply = await getKlimaSupply();

    // share-cache after last cached request:
    // 0-1 minutes -> fresh, return from cache
    // 1-2 minutes -> stale, return from cache but revalidate in background
    // >2 minutes -> stale, recalculate & return fresh value
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=60"
    );
    res.status(200).send(supply);
  } catch (err) {
    res.status(500).send("failed to fetch data");
  }
}
