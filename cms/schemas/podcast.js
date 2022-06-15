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
      name: "showDisclaimer",
      title: "Show Disclaimer",
      description:
        "This will automatically add a disclaimer at the end of the blog so the author does not have to paste it in.",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "hideFromProduction",
      title: "Hide From Production (preview mode):",
      description:
        "When set to TRUE and clicking 'publish', this post will not appear on the production environment, and will only be visible on `staging-site.klimadao.finance`",
      type: "boolean",
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "embedCode",
    },
    prepare(selection) {
      const { title } = selection;
      return Object.assign({}, selection, {
        subtitle: title,
      });
    },
  },
};
