import { NextApiHandler } from "next";
import { loginMarketplaceUser } from "@klimadao/lib/utils";

export interface APIDefaultResponse {
  message: string;
}

const loginUser: NextApiHandler<
  { nonce: string } | APIDefaultResponse
> = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        console.log("API LOGIN body", req.body);

        if (!req.body.wallet) {
          return res
            .status(400)
            .json({ message: "Bad request! Wallet is missing" });
        }

        const response = await loginMarketplaceUser({
          wallet: req.body.wallet,
        });

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

export default loginUser;
