import { t } from "@lingui/macro";
import { queryKlimaRetirementsByBeneficiary } from "lib/charts/queries";
import {
  KlimaRetirementsByBeneficiaryItem,
  SortQueryParams,
} from "lib/charts/types";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import { formatTonnes, getBeneficiaryColumn } from "./helpers";
import styles from "./styles.module.scss";
import { Columns, DataRendererKey } from "./types";

export default class KlimaRetirementsByBeneficiaryListConfiguration extends AbstractTableConfiguration<
  KlimaRetirementsByBeneficiaryItem,
  undefined
> {
  fetchFunction(page: number, params?: SortQueryParams) {
    return queryKlimaRetirementsByBeneficiary({
      ...{
        sort_by: "amount_retired",
        sort_order: "desc",
        page_size: 10,
        page,
      },
      ...params,
    });
  }

  getColumns(): Columns<KlimaRetirementsByBeneficiaryItem> {
    return {
      beneficiary: getBeneficiaryColumn(),
      amount_retired: {
        header: t`Amount retired`,
        cellStyle: layout.textRight,
        dataKey: "amount_retired",
        formatter: formatTonnes,
      },
      number_of_retirements: {
        header: t`Number of retirements`,
        cellStyle: layout.textRight,
        dataKey: "number_of_retirements",
        formatter: (x: string | number) => x,
      },
    };
  }
  desktopRenderer: DataRendererKey = "vertical-table";
  mobileRenderer: DataRendererKey = "cards";

  CardRenderer = (props: { item: KlimaRetirementsByBeneficiaryItem }) => {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitle}>{props.item.beneficiary}</div>
        <div className={styles.facts}>
          <span>{this.getTitle("number_of_retirements")}</span>
          {this.formatValue(props.item, "number_of_retirements")}
        </div>
        <div className={styles.facts}>
          <span>{this.getTitle("amount_retired")}</span>
          <span className={styles.badge}>
            {this.formatValue(props.item, "amount_retired")}
          </span>
        </div>
      </div>
    );
  };
}
