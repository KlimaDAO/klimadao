import { NextApiRequest, NextApiResponse } from "next/types";
import { getBlockRate } from "@klimadao/lib/utils";

type ResponseData = {
  blockRate30Day?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const blockRate = await getBlockRate();
    res.status(200).json({ blockRate30Day: blockRate.toFixed(4) });
  } catch (err) {
    res.status(404).json({ error: "failed to fetch data" });
  }
}
