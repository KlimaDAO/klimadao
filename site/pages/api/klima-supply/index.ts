import { NextApiRequest, NextApiResponse } from "next/types";
import { getKlimaSupply } from "@klimadao/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const supply = await getKlimaSupply();
    res.status(200).send(supply.toString());
  } catch (err) {
    res.status(500).send("failed to fetch data");
  }
}
