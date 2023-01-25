export default {
  name: "podcast",
  title: "Podcast",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rssId",
      title: "RSS Id",
      type: "string",
    },
    {
      name: "embedCode",
      title: "Embed code",
      type: "string",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      title: "Summary",
      description:
        "50-160 char summary to appear in google snippits, and preview cards.",
      type: "text",
      validation: (Rule) => Rule.required().min(50).max(150),
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hideFromProduction",
      title: "Hide From Production (preview mode):",
      description:
        "When set to TRUE and clicking 'publish', this post will not appear on the production environment, and will only be visible on `staging-site.klimadao.finance`",
      type: "boolean",
    },
  ],
};
