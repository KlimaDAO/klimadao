import { NextApiHandler } from "next";
import { createMarketplaceUser } from "@klimadao/lib/utils";
import { User } from "@klimadao/lib/types/marketplace";

export interface APIDefaultResponse {
  message: string;
}

const createUser: NextApiHandler<User | APIDefaultResponse> = async (
  req,
  res
) => {
  switch (req.method) {
    case "POST":
      try {
        console.log("API CREATE body", req.body);

        const signature = req.headers.authorization?.split(" ")[1];

        if (!signature) {
          return res.status(400).json({ message: "Bad request" });
        }

        if (!req.body.handle && !req.body.wallet) {
          return res
            .status(400)
            .json({ message: "Bad request! Handle or Wallet is missing" });
        }

        const response = await createMarketplaceUser(req.body);

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

export default createUser;
