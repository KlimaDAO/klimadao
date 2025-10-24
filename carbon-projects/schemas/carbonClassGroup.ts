import { defineField, defineType } from "sanity";

export default defineType({
  name: "carbonClassGroup",
  title: "Carbon Class Group",
  description: "Groups Carbon Classes",
  type: "document",
  preview: {
    select: {
      title: "name",
    },
    prepare(selection) {
      return {
        title: selection.title,
      };
    },
  },
  fields: [
    defineField({
      name: "name",
      description: "Name of the Carbon Class Group",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      description: "Description of the Carbon Class Group",
      type: "text",
      validation: (r) => r.required(),
    }),
  ],
});
