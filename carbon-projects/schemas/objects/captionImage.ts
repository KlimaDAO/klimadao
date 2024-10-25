import { defineType } from "sanity";

export default defineType({
  name: "captionImage",
  type: "image",
  fields: [
    {
      name: "caption",
      description:
        "English language caption to show below the image. Can include image attribution if needed.",
      type: "string",
    },
  ],
});
