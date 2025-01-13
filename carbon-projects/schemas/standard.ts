import { defineType } from "sanity";

export default defineType({
  name: "standard",
  title: "Standard",
  description: "Information about a standard that applies to projects",
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
      title: "Logo",
      name: "logo",
    },
  ],
});
