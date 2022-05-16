import { NextApiRequest, NextApiResponse } from "next/types";
import { pledgeResolver } from "lib/moralis";
import { findOrCreatePledge } from 'components/pages/Pledge/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      try {
        const signature = req.headers.authorization?.split(" ")[1];
        const data = await findOrCreatePledge({
          pageAddress: req.body.pageAddress,
          pledge: req.body.pledge,
          signature,
        });

        console.log({ data })
        const pledge = JSON.parse(JSON.stringify(data));

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
