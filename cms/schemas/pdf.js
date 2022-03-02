export default {
  name: "pdf",
  title: "PDF",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      description:
        "This is the title of the hyperlink that readers will see in the blog",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "file",
      title: "File",
      type: "file",
      validation: (Rule) => Rule.required(),
      options: {
        accept: ".pdf",
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      author: "author.name",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
