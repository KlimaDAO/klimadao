import { NextApiHandler } from "next";
import { verifyMarketplaceUser } from "@klimadao/lib/utils";

export interface APIDefaultResponse {
  message: string;
}

const verifyUser: NextApiHandler<
  { nonce: string } | APIDefaultResponse
> = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        console.log("API VERIFY body", req.body);

        if (!req.body.wallet && !req.body.signature) {
          return res
            .status(400)
            .json({ message: "Bad request! Wallet or Signature is missing" });
        }

        const response = await verifyMarketplaceUser({
          wallet: req.body.wallet,
          signature: req.body.signature,
        });

        console.log("response", response);

        return res.status(200).json(response);
      } catch ({ message }) {
        console.error("Request failed:", message);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default verifyUser;
