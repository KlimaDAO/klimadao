import { defineField, defineType } from "sanity";
import { sdgs } from "../lib/sdgs";

export default defineType({
  name: "indexContent",
  title: "Index Content",
  description: "Manually curated data for an index of multiple projects",
  type: "document",
  preview: {
    select: {
      slug: "id",
      title: "id",
      subtitle: "name",
    },
  },
  groups: [
    { name: "info", title: "Info" },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "name",
      description:
        "Index name. Use 'Title Case Capitalization'. No trailing period",
      placeholder: "Moss Carbon Credit",
      group: "info",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "id",
      description: "Index identifier, unique, e.g. MCO2, CCO2",
      placeholder: "MCO2",
      group: "info",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      type: "array",
      name: "projects",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      description: "The projects this index is associated with",
      group: "info",
    }),
    defineField({
      name: "shortDescription",
      description:
        "Short description, e.g. for retirement PDFs. Ideally 300-600 chars, no newlines, no bullet points.",
      group: "info",
      type: "text",
      validation: (r) => r.min(20).max(700),
    }),
    defineField({
      name: "longDescription",
      description: "Longer description",
      group: "info",
      type: "text",
    }),
    defineField({
      name: "sdgs",
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
      name: "url",
      description: "Website of the index product",
      group: "media",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      description: "Primary cover image to be shown on project page",
      group: "media",
      type: "image",
      fields: [
        {
          name: "caption",
          description:
            "English language caption to show below the image. Can include image attribution if needed.",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "images",
      description: "Other images associated with this project",
      group: "media",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "caption",
              description:
                "English language caption to show below the image. Can include image attribution if needed.",
              type: "string",
            },
          ],
        },
      ],
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
