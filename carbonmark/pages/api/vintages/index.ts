import { carbonmark } from "@klimadao/lib/constants";
import { NextApiHandler } from "next";

export interface APIDefaultResponse {
  message: string;
}

const getVintages: NextApiHandler<string[] | APIDefaultResponse> = async (
  req,
  res
) => {
  switch (req.method) {
    case "GET":
      try {
        const result = await fetch(`${carbonmark.vintages}`);

        const json = await result.json();

        return res.status(200).json(json);
      } catch ({ message }) {
        console.error("Request failed:", message);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getVintages;
