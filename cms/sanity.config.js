import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./schemas/schema";

export default defineConfig({
  title: "KlimaDAO",
  projectId: "dk34t4vc",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: [schemas],
  },
});
