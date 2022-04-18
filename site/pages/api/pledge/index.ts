import { NextApiRequest, NextApiResponse } from "next/types";
import { findOrCreatePledge, pledgeResolver } from "lib/moralis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query as { address: string };

  switch (req.method) {
    case "PUT":
      try {
        const data = await findOrCreatePledge({
          pledge: req.body,
          sessionToken: req.query.sessionToken,
        });
        const pledge = JSON.parse(JSON.stringify(data));

        res.status(200).json({ pledge: pledgeResolver(pledge) });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      // TODO: boilerplate, will revisit
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
