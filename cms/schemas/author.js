export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
