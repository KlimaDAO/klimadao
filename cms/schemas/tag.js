export default {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "tag",
      title: "Tag",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "label_en",
      title: "Label (en)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description_en",
      title: "Description (en)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      label_en: "label_en",
      description_en: "description_en",
    },
  },
};
