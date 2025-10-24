import { defineField, defineType } from "sanity";

export default defineType({
  name: "carbonClass",
  title: "Carbon Class",
  description: "Metadata associated with a carbonClass",
  type: "document",
  preview: {
    select: {
      title: "name",
      subtitle: "address",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
      };
    },
  },
  fields: [
    defineField({
      name: "name",
      description: "Name of the Carbon Class",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "address",
      description: "Address of the Carbon Class on the base blockchain",
      type: "string",
      validation: (r) =>
        r
          .regex(/^0x[a-fA-F0-9]{40}$/, { name: "Invalid address format" })
          .custom((val: string) => {
            if (val.toLowerCase() !== val) {
              return "Address must be in lowercase";
            }
            return true;
          })
          .required(),
    }),
    defineField({
      type: "reference",
      name: "group",
      to: [{ type: "carbonClassGroup" }],
      description: "The Group this Carbon Class belongs to",
      validation: (r) => r.required(),
    }),
  ],
});
