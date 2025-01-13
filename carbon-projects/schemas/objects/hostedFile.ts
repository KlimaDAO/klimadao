import { defineType } from "sanity";

export default defineType({
  name: "hostedFile",
  type: "file",
  title: "Hosted file",
  description:
    "A file whose content is hosted directly in the Sanity CMS, with associated metadata",
  fields: [
    {
      type: "string",
      title: "File name",
      name: "filename",
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
      title: "File size",
      name: "size",
    },
  ],
});
