import { formatTonnes } from "@klimadao/lib/utils/lightIndex";
import { t } from "@lingui/macro";
import PolyscanLink from "components/charts/helpers/PolygonscanLink";
import VerraProjectLink from "components/charts/helpers/VerraProjectLink";
import { helpers } from "lib/charts";
import { queryRawKlimaRetirements } from "lib/charts/queries";
import layout from "theme/layout.module.scss";

const configuration = {
  fetchFunction: (page: number) => {
    return queryRawKlimaRetirements({
      sort_by: "retirement_date",
      sort_order: "desc",
      page_size: 10,
      page,
    });
  },
  getColumns: (locale: string) => [
    {
      header: t`Beneficiary address`,
      cellStyle: layout.textLeft,
      dataKey: "beneficiary",
      formatter: (x: string | number) => x,
    },
    {
      header: t`Project`,
      cellStyle: layout.textCenter,
      dataKey: "project_id",
      formatter: (projectId: string) => (
        <VerraProjectLink projectId={projectId}></VerraProjectLink>
      ),
    },
    {
      header: t`Pool`,
      cellStyle: layout.textCenter,
      dataKey: "token",
      formatter: (x: string | number) => x,
    },
    {
      header: t`Date`,
      cellStyle: layout.textRight,
      dataKey: "retirement_date",
      formatter: helpers.formatDateAsDaysShort(locale),
    },
    {
      header: t`Tonnes`,
      cellStyle: layout.textRight,
      dataKey: "quantity",
      formatter: (amount: string | number) =>
        formatTonnes({
          amount: String(amount),
          locale,
          minimumFractionDigits: 2,
        }),
    },
    {
      header: "",
      cellStyle: layout.textLeft,
      dataKey: "transaction_id",
      formatter: (transactionId: string) => (
        <PolyscanLink transactionId={transactionId}></PolyscanLink>
      ),
    },
  ],
};
export default configuration;
