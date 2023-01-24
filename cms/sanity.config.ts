import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import schemas from "./schemas/schema";

export default defineConfig({
  title: "KlimaDAO",
  projectId: "dk34t4vc",
  dataset: "production",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
  tools: (prev) => {
    if (process.env.NODE_ENV === "development") {
      return prev;
    }

    return prev.filter((tool) => tool.name !== "vision");
  },
});
