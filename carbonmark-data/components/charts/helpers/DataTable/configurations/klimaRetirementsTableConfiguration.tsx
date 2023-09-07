import { formatTonnes } from "@klimadao/lib/utils/lightIndex";
import { t } from "@lingui/macro";
import PolyscanLink from "components/charts/helpers/PolygonscanLink";
import VerraProjectLink from "components/charts/helpers/VerraProjectLink";
import { helpers } from "lib/charts";
import { queryRawKlimaRetirements } from "lib/charts/queries";
import { RawRetirementsItem } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";

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
  cardRenderer(props: { item: RawRetirementsItem }) {
    const locale = currentLocale();
    return (
      <div className={styles.card}>
        <div className={styles.cardTitle}>{props.item.beneficiary}</div>
        <div className={styles.facts}>
          <div className={styles.date}>
            {helpers.formatDateAsDaysShort(locale)(props.item.retirement_date)}
          </div>

          {props.item.bridge}
          <VerraProjectLink
            projectId={props.item.project_id}
          ></VerraProjectLink>
        </div>
        <div className={styles.badge}>
          {formatTonnes({
            amount: String(props.item.quantity),
            locale,
            minimumFractionDigits: 2,
          })}{" "}
          Tonnes
        </div>
        <PolyscanLink transactionId={props.item.transaction_id}></PolyscanLink>
      </div>
    );
  },
};
export default configuration;
