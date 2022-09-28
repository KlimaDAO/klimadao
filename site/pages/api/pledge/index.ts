import { NextApiRequest, NextApiResponse } from "next/types";
import { findOrCreatePledge } from "components/pages/Pledge/lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      try {
        const signature = req.headers.authorization?.split(" ")[1];

        if (!signature) {
          return res.status(400).json({ message: "Bad request" });
        }

        const pledge = await findOrCreatePledge({
          pageAddress: req.body.pageAddress,
          pledge: req.body.pledge,
          signature,
        });

        if (!pledge) {
          throw new Error(
            `Failed put pledge request (address: ${req.body.pageAddress})`
          );
        }

        await res.unstable_revalidate(req.body.urlPath);
        res.status(200).json({ pledge });
      } catch ({ message }) {
        console.error("Request failed:", message);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
