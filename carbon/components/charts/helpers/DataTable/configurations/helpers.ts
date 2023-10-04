import { formatTonnes as formatTonnesGeneric } from "@klimadao/lib/utils/lightIndex";
import { t } from "@lingui/macro";
import { currentLocale } from "lib/i18n";
import layout from "theme/layout.module.scss";
import { Column } from "./types";

export function getBeneficiaryColumn<
  T extends { beneficiary: string },
>(): Column<T> {
  return {
    header: t`Beneficiary address`,
    cellStyle: layout.textLeft,
    dataKey: "beneficiary",
    formatter: (x: string | number) => x,
  };
}
export function formatTonnes(amount: string | number) {
  const locale = currentLocale();
  return formatTonnesGeneric({
    amount: String(amount),
    locale,
    minimumFractionDigits: 2,
  });
}

export const standardVerticalDataTableHeight = 428;
