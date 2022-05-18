import { NextApiRequest, NextApiResponse } from "next/types";
import { findOrCreatePledge } from "components/pages/Pledge/lib/firebase";
import { pledgeResolver } from "components/pages/Pledge/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      try {
        const signature = req.headers.authorization?.split(" ")[1];

        if (!signature) {
          return res.status(400).json({ message: 'Bad request' })
        }

        const pledge = await findOrCreatePledge({
          pageAddress: req.body.pageAddress,
          pledge: req.body.pledge,
          signature,
        });

        res.status(200).json({ pledge: pledgeResolver(pledge) });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
