import { carbonmark } from "@klimadao/lib/constants";
import { Project } from "@klimadao/lib/types/carbonmark";
import { NextApiHandler } from "next";

export interface APIDefaultResponse {
  message: string;
}

const getProjects: NextApiHandler<Project[] | APIDefaultResponse> = async (
  req,
  res
) => {
  switch (req.method) {
    case "GET":
      try {
        const result = await fetch(`${carbonmark.projects}`);

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

export default getProjects;
