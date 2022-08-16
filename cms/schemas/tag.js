export default {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "label_en",
      title: "Label (en)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tag",
      title: "Tag",
      type: "slug",
      options: {
        source: "label_en",
        maxLength: 100,
      },
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
      title: "label_en",
    },
  },
};
