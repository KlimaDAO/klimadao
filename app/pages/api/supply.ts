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

/**
 *
 * @param req
 * @param res
 * @example GET /api/supply Returns {APIResponse}
 * @example GET /api/supply?type=total-supply Returns number
 * @example GET /api/supply?type=circulating-supply Return number
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  try {
    switch (req.method) {
      case "GET":
        const { type } = req.query;

        const provider = getStaticProvider({
          chain: "polygon",
        });

        const contract = getContract({
          contractName: "klima",
          network: DEFAULT_NETWORK, // TODO; Make dynamic for testnet
          provider,
        });

        const totalSupply = await contract.totalSupply();

        if (!totalSupply) {
          return res.status(500).send({ error: "Failed to get total supply" });
        }

        const totalSupplyNum = Number(formatUnits(totalSupply, 9));

        if (type) {
          switch (type) {
            case "total-supply":
            case "circulating-supply":
              return res.status(200).send(totalSupplyNum);
            default:
              return res.status(400).end({ error: "Invalid type" });
          }
        }

        return res.status(200).send({
          totalSupply: totalSupplyNum,
          circulatingSupply: totalSupplyNum,
        });
      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
