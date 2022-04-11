import { NextApiRequest, NextApiResponse } from "next/types";
import { getPledgeByAddress, pledgeResolver } from "lib/moralis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query as { address: string };

  switch (req.method) {
    case "GET":
      try {
        const data = await getPledgeByAddress(address);

        if (!data) {
          res.status(404).json({ message: "Not found" });
        }

        const pledge = JSON.parse(JSON.stringify(data));
        res.status(200).json({ pledge: pledgeResolver(pledge) });
      } catch (error) {
        res.status(500);
      }
      break;
    case "PUT":
      break;
    default:
      // TODO: boilerplate, will revisit
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
