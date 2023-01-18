import { findOrCreatePledge } from "components/pages/Pledge/lib/firebase";
import { NextApiRequest, NextApiResponse } from "next/types";
import { array, boolean, number, object, string } from "yup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pledgeSchema = object({
    id: string().nullable(),
    ownerAddress: string().required(),
    nonce: string().required(),
    name: string().required(),
    profileImageUrl: string().url(),
    profileWebsiteUrl: string().url(),
    description: string().required().max(500),
    wallets: array().of(
      object({
        address: string().required(),
        status: string().required(),
        saved: boolean().required(),
      })
    ),
    methodology: string().required().max(1000),
    footprint: number().required().min(0),
    categories: array()
      .of(
        object({
          name: string().required().max(32),
          quantity: number().required().min(0),
        })
      )
      .required()
      .min(1),
    createdAt: number(),
    updatedAt: number(),
  }).noUnknown();

  switch (req.method) {
    case "PUT":
      try {
        const signature = req.headers.authorization?.split(" ")[1];

        if (!signature) {
          return res.status(400).json({ message: "Bad request" });
        }
        await pledgeSchema.validate(req.body.pledge);
        const pledge = await findOrCreatePledge({
          pageAddress: req.body.pageAddress,
          pledge: req.body.pledge,
          signature,
          secondaryWalletAddress: req.body.secondaryWalletAddress,
          action: req.body.action,
          // url in here?
        });

        if (!pledge) {
          const e = new Error(
            `Failed put pledge request (address: ${req.body.pageAddress})`
          );
          e.name = "FailedRequest";
          throw e;
        }

        await res.revalidate(req.body.urlPath);
        res.status(200).json({ pledge });
      } catch (e: any) {
        console.error("Request failed:", e.message);
        if (e instanceof Error) {
          if (e.name === "WalletAlreadyPinned") {
            return res.status(403).json({ message: e.message, name: e.name });
          } else {
            return res.status(500).json({ message: e.message, name: e.name });
          }
        } else {
          return res.status(500).json({
            message: "Unknown error, check server logs",
            name: "UnknownError",
          });
        }
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end({
        message: `Method ${req.method} Not Allowed`,
        name: "MethodNotAllowed",
      });
  }
}
