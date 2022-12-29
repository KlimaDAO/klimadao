import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export default defineConfig({
  title: "KlimaDAO",
  projectId: "dk34t4vc",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: [],
  },
});
