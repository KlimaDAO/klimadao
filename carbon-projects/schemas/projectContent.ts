import { defineField, defineType } from "sanity";
import { categories } from "../lib/categories";
import { sdgs } from "../lib/sdgs";

export default defineType({
  name: "projectContent",
  title: "Project Content",
  description: "Unofficial data or content associated with a specific project",
  type: "document",
  preview: {
    select: {
      slug: "project.id",
    },
    prepare(selection) {
      return {
        title: selection.slug.current || "",
      };
    },
  },
  groups: [
    { name: "info", title: "Info" },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      type: "reference",
      name: "project",
      to: [{ type: "project" }],
      description: "The project this content is associated with",
      group: "info",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nameOverride",
      description:
        "Manually modified name to override the official registry name for the project (used to handle formatting issues)",
      group: "info",
      type: "string",
    }),
    defineField({
      name: "categoryOverride",
      description:
        "For this project, override the methodology's normal category with a different one from our predefined ontology of categories",
      type: "string",
      options: {
        list: categories,
      },
    }),
    defineField({
      name: "shortDescription",
      description:
        "Short description, e.g. for retirement PDFs. Ideally 300-600 chars, no newlines, no bullet points.",
      group: "info",
      type: "type"
    }),
    defineField({
      name: "longDescription",
      description: "Longer description",
      group: "info",
      type: "array",
      of: [{type: "block"}]
    }),
    defineField({
      name: "blockLongDescription",
      title: "Block Long Description",
      description: "Block-type longer description to support rich formatting",
      group: "info",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "extraSdgs",
      description:
        "List of additional Sustainable Development Goals for this project (not authoritative from the registry).",
      group: "info",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: sdgs,
      },
    }),
    defineField({
      name: "coverImage",
      description: "Primary cover image to be shown on project page",
      group: "media",
      type: "captionImage",
    }),
    defineField({
      name: "satelliteImage",
      description:
        "Mapbox satellite image based on registry lat/long to be shown on project page",
      group: "media",
      type: "captionImage",
    }),
    defineField({
      name: "images",
      description: "Other images associated with this project",
      group: "media",
      type: "array",
      of: [{ type: "captionImage" }],
    }),
    defineField({
      name: "notes",
      description:
        "Use this space to document how this media was generated or procured, so that this work can be reproduced by others.",
      type: "text",
      group: "meta",
    }),
    defineField({
      name: "shortDescriptionMeta",
      description:
        "Use this space to document how the short description was generated or procured, so that this work can be reproduced by others.",
      type: "text",
      group: "meta",
    }),
    defineField({
      name: "longDescriptionMeta",
      description:
        "Use this space to document how the long description was generated or procured, so that this work can be reproduced by others.",
      type: "text",
      group: "meta",
    }),
  ],
});
