import { formatTonnes } from "@klimadao/lib/utils/lightIndex";
import { t } from "@lingui/macro";
import PolyscanLink from "components/charts/helpers/PolygonscanLink";
import VerraProjectLink from "components/charts/helpers/VerraProjectLink";
import { helpers } from "lib/charts";
import { queryRawKlimaRetirements } from "lib/charts/queries";
import { PaginatedResponse, RawRetirementsItem } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import styles from "./styles.module.scss";
import { Columns } from "./types";

/** A base configuration for The detailed list of klima retirement trends */
export default class KlimaRetirementsByTokenListConfigurationBase extends AbstractTableConfiguration<RawRetirementsItem> {
  fetchFunction(page: number) {
    return queryRawKlimaRetirements({
      sort_by: "retirement_date",
      sort_order: "desc",
      page_size: 10,
      page,
    });
  }
  getColumns(): Columns<RawRetirementsItem> {
    const locale = currentLocale();
    return {
      beneficiary: {
        header: t`Beneficiary address`,
        cellStyle: layout.textLeft,
        dataKey: "beneficiary",
        formatter: (x: string | number) => x,
      },
      project_id: {
        header: t`Project`,
        cellStyle: `${layout.textCenter} ${layout.nowrap}`,
        dataKey: "project_id",
        formatter: (projectId: string) => (
          <VerraProjectLink projectId={projectId}></VerraProjectLink>
        ),
      },
      token: {
        header: t`Token`,
        cellStyle: layout.textCenter,
        dataKey: "token",
        formatter: (x: string | number) => {
          if (x == "BCT" || x == "NCT") return "TCO2";
          if (x == "UBO" || x == "NBO") return "C3T";
          return "";
        },
      },
      retirement_date: {
        header: t`Date`,
        cellStyle: layout.textRight,
        dataKey: "retirement_date",
        formatter: helpers.formatDateAsDaysShort(locale),
      },
      quantity: {
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
      transaction_id: {
        header: "",
        cellStyle: layout.blockRight,
        dataKey: "transaction_id",
        formatter: (transactionId: string) => (
          <PolyscanLink transactionId={transactionId}></PolyscanLink>
        ),
      },
    };
  }
  cardRenderer = (props: { item: RawRetirementsItem }) => {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitle}>{props.item.beneficiary}</div>
        <div className={styles.facts}>
          <div className={styles.date}>
            {this.formatValue(props.item, "retirement_date")}
          </div>
          {this.formatValue(props.item, "token")}
          {this.formatValue(props.item, "project_id")}
        </div>
        <div className={styles.badge}>
          {t`${this.formatValue(props.item, "quantity")} Tonnes`}
        </div>
        {this.formatValue(props.item, "transaction_id")}
      </div>
    );
  };
  desktopRenderer = (props: {
    data: PaginatedResponse<RawRetirementsItem>;
  }) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
  mobileRenderer = (props: { data: PaginatedResponse<RawRetirementsItem> }) => {
    return this.CardsLayout({
      data: props.data,
      cardRenderer: this.cardRenderer,
    });
  };
}
