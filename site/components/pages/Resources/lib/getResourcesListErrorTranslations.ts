import { t } from "@lingui/macro";

export const resourcesErrorTranslationsMap = {
  ["resources.form.input.search.error.required"]: t({
    id: "resources.form.input.search.error.required",
    message: "Enter a search term",
  }),
} as const;

export type ResourcesErrorId = keyof typeof resourcesErrorTranslationsMap;
