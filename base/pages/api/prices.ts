// pages/api/prices.ts

import type { NextApiRequest, NextApiResponse } from "next";

const CMC_API_KEY = process.env.CMC_API_KEY;
const CMC_PRO_API_URL = "https://pro-api.coinmarketcap.com/v2";

type ResponseData = {
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { symbols } = req.query;

  if (!symbols) {
    return res.status(400).json({ error: "No symbols provided" });
  }

  try {
    const response = await fetch(
      `${CMC_PRO_API_URL}/cryptocurrency/quotes/latest?symbol=${symbols}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": CMC_API_KEY || "",
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("CMC API error:", error);
    return res.status(500).json({ error: "Failed to fetch prices" });
  }
}
