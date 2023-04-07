import { urls } from "lib/constants";
import { NextApiHandler } from "next";

export interface APIDefaultResponse {
  message: string;
}

const loginUser: NextApiHandler<
  { nonce: string } | APIDefaultResponse
> = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        if (!req.body.wallet) {
          return res
            .status(400)
            .json({ message: "Bad request! Wallet is missing" });
        }

        const result = await fetch(`${urls.api.users}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });

        const json = await result.json();

        return res.status(200).json(json);
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
