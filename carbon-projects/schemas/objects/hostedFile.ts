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
      title: "MIME Type (e.g. application/pdf)",
      description:
        "Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types",
      name: "mimetype",
    },
    {
      type: "string",
      title: "File category",
      name: "category",
    },
    {
      type: "number",
      title: "File size (in bytes)",
      name: "size",
    },
  ],
});
