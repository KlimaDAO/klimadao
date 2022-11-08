import { NextApiHandler } from "next";
import { updateMarketplaceUser } from "@klimadao/lib/utils";
import { User } from "@klimadao/lib/types/marketplace";

export interface APIDefaultResponse {
  message: string;
}

const updateUser: NextApiHandler<User | APIDefaultResponse> = async (
  req,
  res
) => {
  switch (req.method) {
    case "PUT":
      try {
        console.log("API UPDATE body", req.body);
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
          return res.status(400).json({ message: "Bad request" });
        }

        if (!req.body.handle && !req.body.wallet) {
          return res
            .status(400)
            .json({ message: "Bad request! Handle or Wallet is missing" });
        }

        const response = await updateMarketplaceUser(req.body, req.headers);

        return res.status(200).json(response);
      } catch ({ message }) {
        console.error("Request failed:", message);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default updateUser;
