import {
  getContract,
  getStaticProvider,
  getTokenDecimals,
} from "@klimadao/lib/utils";
import { formatUnits } from "ethers/lib/utils";
import { DEFAULT_NETWORK } from "lib/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {},
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
};

type APIResponse =
  | number
  | {
      totalSupply: number;
      circulatingSupply: number;
    }
  | {
      error: string;
    };

const DEFAULT_TOKENS = ["klima", "bct"];

/**
 * @description fetch total supply for a token
 * @param req
 * @param res
 * @example GET /api/supply?type=total&token=klima Returns number
 * @example GET /api/supply?type=circulating&token=klima Return number
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  try {
    switch (req.method) {
      case "GET":
        const { type, token } = req.query;

        if (!token || !type) {
          return res
            .status(400)
            .send({ error: "Token or type is missing from params" });
        }

        if (typeof token !== "string") {
          return res.status(400).send({ error: "Token should be a string" });
        }

        const targetToken = DEFAULT_TOKENS.find((t) => t === token);

        if (!targetToken) {
          return res.status(400).send({ error: "Invalid token" });
        }

        const provider = getStaticProvider({
          chain: "polygon",
        });

        const contract = getContract({
          // TODO: Improve typing by exporting ContractName type from lib
          contractName: targetToken as "klima" | "bct",
          network: DEFAULT_NETWORK,
          provider,
        });

        const totalSupply = await contract.totalSupply();

        if (!totalSupply) {
          return res.status(500).send({ error: "Failed to get total supply" });
        }

        const totalSupplyNum = Number(
          formatUnits(totalSupply, getTokenDecimals(targetToken))
        );

        switch (type) {
          case "total":
          case "circulating":
            return res.status(200).send(totalSupplyNum);
          default:
            return res.status(400).send({ error: "Invalid type" });
        }

      default:
        res.setHeader("Allow", ["GET"]);
        return res
          .status(405)
          .send({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
