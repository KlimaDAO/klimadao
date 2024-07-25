import { getContract, getStaticProvider } from "@klimadao/lib/utils";
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

// This can be simplified to be just a string[]
// but IERC20 ABI doesn't have a decimal exposed
const DEFAULT_TOKENS = [
  {
    name: "klima",
    decimals: 9,
  },
  {
    name: "bct",
    decimals: 18,
  },
];

/**
 * @description fetch total supply for a token
 * @param req
 * @param res
 * @example GET /api/supply?token=klima Returns {APIResponse}
 * @example GET /api/supply?type=total-supply&token=klima Returns number
 * @example GET /api/supply?type=circulating-supply&token=klima Return number
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  try {
    switch (req.method) {
      case "GET":
        const { type, token } = req.query;

        if (!token) {
          return res.status(400).send({ error: "Token missing" });
        }

        if (typeof token !== "string") {
          return res.status(400).send({ error: "Token should be a string" });
        }

        const targetToken = DEFAULT_TOKENS.find((t) => t.name === token);

        if (!targetToken) {
          return res.status(400).send({ error: "Invalid token" });
        }

        const provider = getStaticProvider({
          chain: "polygon",
        });

        const contract = getContract({
          // TODO: Improve typing by exporting ContractName type from lib
          contractName: targetToken.name as "klima" | "bct",
          network: DEFAULT_NETWORK,
          provider,
        });

        const totalSupply = await contract.totalSupply();

        if (!totalSupply) {
          return res.status(500).send({ error: "Failed to get total supply" });
        }

        const totalSupplyNum = Number(
          formatUnits(totalSupply, targetToken.decimals)
        );

        if (type) {
          switch (type) {
            case "total-supply":
            case "circulating-supply":
              return res.status(200).send(totalSupplyNum);
            default:
              return res.status(400).send({ error: "Invalid type" });
          }
        }

        return res.status(200).send({
          totalSupply: totalSupplyNum,
          circulatingSupply: totalSupplyNum,
        });
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
