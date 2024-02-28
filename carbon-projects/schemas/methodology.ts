import { defineField, defineType } from "sanity";

const categories = [
  { title: "Energy Efficiency", value: "Energy Efficiency" },
  { title: "Forestry", value: "Forestry" },
  { title: "Industrial Processing", value: "Industrial Processing" },
  { title: "Renewable Energy", value: "Renewable Energy" },
  { title: "Blue Carbon", value: "Blue Carbon" },
  { title: "Agriculture", value: "Agriculture" },
  { title: "Other", value: "Other" },
];

export default defineType({
  name: "methodology",
  title: "Methodology",
  description: "Methodology definition",
  type: "document",
  groups: [{ name: "location" }],
  preview: {
    select: {
      slug: "id",
      name: "name",
    },
    prepare(selection) {
      return {
        title: selection.slug.current || "",
        subtitle: selection.name || "",
      };
    },
  },
  fields: [
    defineField({
      name: "id",
      type: "slug",
      description: "Unique identifier for this methodology e.g. 'VMR0005'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      description:
        "Methodology name. Use 'Title Case Capitalization'. No trailing period. No version number.",
      placeholder: "Methodology for Installation of Low-Flow Water Devices",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      description: "From our predefined ontology of categories",
      type: "string",
      options: {
        list: categories,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      type: "string",
      description:
        "Link to the authoritative methodology webpage or PDF document",
      placeholder:
        "https://cdm.unfccc.int/methodologies/DB/5SI1IXDIZBL6OAKIB3JFUFAQ86MBEE",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isRemoval",
      description: "Is this methodology for carbon removal/sequestration?",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
