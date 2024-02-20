import { defineField, defineType } from "sanity";

export default defineType({
  name: "country",
  title: "Country",
  description: "Country metadata",
  type: "document",
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
      description: "Unique two-letter ISO code for this country e.g. 'AU'",

      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      description: "Country common name",
      placeholder: "Nowheria",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "centroid",
      description: "Latitude and longitude of the centroid of the country",
      type: "geopoint",
      validation: (r) => r.required(),
    }),
  ],
});
