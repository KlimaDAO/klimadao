import { t } from "@lingui/macro";

const ERROR_MAP = {
  ["resources.form.input.search.error.required"]: t({
    id: "resources.form.input.search.error.required",
    message: "Enter a search term",
  }),
};

export const getResourcesListErrorTranslations = (id: string) => {
  return ERROR_MAP[id as keyof typeof ERROR_MAP];
};
