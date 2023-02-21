import { urls } from "lib/constants";
import { User } from "lib/types/carbonmark";
import { NextApiHandler } from "next";

export interface APIDefaultResponse {
  message: string;
}

const singleProject: NextApiHandler<User | APIDefaultResponse> = async (
  req,
  res
) => {
  switch (req.method) {
    case "GET":
      try {
        const { project_id } = req.query;

        if (!project_id) {
          return res.status(400).json({ message: "No project_id provided" });
        }

        const result = await fetch(`${urls.api.projects}/${project_id}`);

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

export default singleProject;
