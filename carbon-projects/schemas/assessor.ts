import { defineType } from "sanity";

export default defineType({
  name: "assessor",
  title: "Assessor",
  description: "Information about an organization that assesses projects",
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
        {
          type: "reference",
          to: [{ type: "accreditation" }],
        },
      ],
    },
  ],
});
