import { defineType } from "sanity";

export default defineType({
  name: "developer",
  title: "Developer",
  description: "Information about an organization that develops projects",
  description:
    "A profile containing information about an entity including name, avatar, and link",
  type: "document",
  preview: {
    select: {
      name: "name",
    },
    prepare(selection) {
      return {
        title: selection.name || "",
      };
    },
  },
  fields: [
    {
      type: "string",
      title: "Name",
      name: "name",
      validation: (r) => r.required(),
    },
    {
      type: "string",
      title: "Link",
      name: "link",
    },
    {
      type: "image",
      title: "Avatar",
      name: "avatar",
    },
    {
      type: "array",
      title: "Carbonmark Handles",
      name: "handles",
      of: [{ type: "string" }],
    },
  ],
});
