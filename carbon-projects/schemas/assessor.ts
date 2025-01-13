import { defineType } from "sanity";

export default defineType({
  name: "assessor",
  title: "Assessor",
  description: "Information about an organization that assesses projects",
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
      title: "Accreditations",
      name: "accreditations",
      of: [
        { type: "string", name: "name" },
        { type: "string", name: "link" },
      ],
    },
  ],
});
