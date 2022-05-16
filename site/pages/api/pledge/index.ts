import { NextApiRequest, NextApiResponse } from "next/types";
import {
  findOrCreatePledge,
  pledgeResolver,
} from "components/pages/Pledge/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      try {
        const signature = req.headers.authorization?.split(" ")[1] as string;
        const pledge = await findOrCreatePledge({
          pageAddress: req.body.pageAddress,
          pledge: req.body.pledge,
          signature,
        });

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
