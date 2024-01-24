import { t } from "@lingui/macro";

export const validateIcrAmount = (value: string, id: string) => {
  return (
    !id.startsWith("ICR") ||
    Number.isInteger(parseFloat(value)) ||
    t`ICR credits can only be listed in whole tonnes`
  );
};
