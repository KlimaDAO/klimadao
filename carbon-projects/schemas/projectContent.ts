import { defineField, defineType } from "sanity";
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
      name: "satelliteImage",
      description:
        "Mapbox satellite image based on registry lat/long to be shown on project page",
      group: "media",
      type: "image",
      fields: [
        {
          name: "caption",
          description:
            "English language caption to show below the image. Can include image attribution if needed.",
          type: "string",
          placeholder: "Satellite image of the project location",
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
