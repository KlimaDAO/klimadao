import { defineType } from "sanity";

export default defineType({
  name: "externalFile",
  type: "object",
  title: "External file",
  fields: [
    {
      type: "string",
      title: "File name",
      name: "filename",
    },
    {
      type: "url",
      title: "URI",
      name: "uri",
      validation: (Rule) => [Rule.required()],
    },
    {
      type: "string",
      title: "Description or Caption",
      name: "description",
    },
    {
      type: "string",
      title: "MIME Type",
      name: "mimetype",
    },
    {
      type: "string",
      title: "File category",
      name: "category",
    },
    {
      type: "number",
      title: "File size (bytes)",
      name: "size",
    },
  ],
});
