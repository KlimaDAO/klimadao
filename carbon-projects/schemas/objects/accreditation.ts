import { defineType } from "sanity";

export default defineType({
  name: "accreditation",
  type: "object",
  fields: [
    { type: "string", name: "name" },
    { type: "string", name: "link" },
  ],
});
