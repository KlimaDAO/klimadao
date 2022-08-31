import { t } from "@lingui/macro";

export const getResourcesListErrorMap = (id: string) => {
  const ERROR_MAP = {
    ["resources.form.input.search.error.required"]: t({
      id: "resources.form.input.search.error.required",
      message: "Enter a search term",
    }),
  };

  return ERROR_MAP[id as keyof typeof ERROR_MAP];
};
