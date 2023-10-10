import { t } from "@lingui/macro";
import PolyscanLink from "components/charts/helpers/PolygonscanLink";
import VerraProjectLink from "components/charts/helpers/VerraProjectLink";
import { helpers } from "lib/charts";
import { queryKlimaRawRetirements } from "lib/charts/queries";
import { PaginatedResponse, RawRetirementsItem } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import { formatTonnes, getBeneficiaryColumn } from "./helpers";
import styles from "./styles.module.scss";
import { Column } from "./types";

/** A base configuration for The detailed list of klima retirement trends */
export default abstract class KlimaRetirementsListConfigurationBase extends AbstractTableConfiguration<
  RawRetirementsItem,
  undefined
> {
  fetchFunction(page: number) {
    return queryKlimaRawRetirements({
      sort_by: "retirement_date",
      sort_order: "desc",
      page_size: 10,
      page,
    });
  }
  get locale() {
    return currentLocale();
  }
  get beneficiaryColumn(): Column<RawRetirementsItem> {
    return getBeneficiaryColumn();
  }
  get projectIdColumn(): Column<RawRetirementsItem> {
    return {
      header: t`Project`,
      cellStyle: `${layout.textCenter} ${layout.nowrap}`,
      dataKey: "project_id",
      formatter: (projectId: string) => (
        <VerraProjectLink projectId={projectId}></VerraProjectLink>
      ),
    };
  }
  get tokenColumn(): Column<RawRetirementsItem> {
    return {
      header: t`Pool`,
      cellStyle: layout.textCenter,
      dataKey: "token",
      formatter: (x: string | number) => x,
    };
  }
  get protocolColumn(): Column<RawRetirementsItem> {
    return {
      header: t`Token`,
      cellStyle: layout.textCenter,
      dataKey: "token",
      formatter: (x: string | number) => {
        if (x == "BCT" || x == "NCT") return "TCO2";
        if (x == "UBO" || x == "NBO") return "C3T";
        return "";
      },
    };
  }

  get retirementDateColumn(): Column<RawRetirementsItem> {
    return {
      header: t`Date`,
      cellStyle: layout.textRight,
      dataKey: "retirement_date",
      formatter: helpers.formatDateAsDaysShort,
    };
  }
  get transactionIdColumn(): Column<RawRetirementsItem> {
    return {
      header: "",
      cellStyle: layout.blockRight,
      dataKey: "transaction_id",
      formatter: (transactionId: string) => (
        <PolyscanLink transactionId={transactionId}></PolyscanLink>
      ),
    };
  }
  get quantityColumn(): Column<RawRetirementsItem> {
    return {
      header: t`Tonnes`,
      cellStyle: layout.textRight,
      dataKey: "quantity",
      formatter: formatTonnes,
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
