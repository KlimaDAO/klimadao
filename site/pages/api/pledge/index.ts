import { NextApiRequest, NextApiResponse } from "next/types";
import { findOrCreatePledge, pledgeResolver } from "lib/moralis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      try {
        const signature = req.headers.authorization?.split(" ")[1];
        const data = await findOrCreatePledge({
          pledge: req.body,
          signature,
        });
        const pledge = JSON.parse(JSON.stringify(data));

        // init firebase admin
        // function verify

        res.status(200).json({ pledge: pledgeResolver(pledge) });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
