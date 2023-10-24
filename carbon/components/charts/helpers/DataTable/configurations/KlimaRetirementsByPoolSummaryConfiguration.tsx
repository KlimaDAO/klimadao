import { t } from "@lingui/macro";
import { helpers } from "lib/charts";
import { queryKlimaMonthlyRetirementsByPool } from "lib/charts/queries";
import { KlimaMonthlyRetirementsByTokenItem } from "lib/charts/types";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import styles from "./styles.module.scss";

import { Columns, DataRendererKey } from "./types";

export default class KlimaRetirementsByPoolSummaryConfiguration extends AbstractTableConfiguration<
  KlimaMonthlyRetirementsByTokenItem,
  undefined
> {
  async fetchFunction(_page: number) {
    const data = await queryKlimaMonthlyRetirementsByPool({
      sort_by: "retirement_date",
      sort_order: "desc",
      page_size: 12,
    });
    data.items.sort((item1, item2) =>
      item1.retirement_date > item2.retirement_date ? 1 : -1
    );
    return data;
  }
  getColumns(): Columns<KlimaMonthlyRetirementsByTokenItem> {
    return {
      retirement_date: {
        header: "",
        cellStyle: `${styles.header} ${layout.nowrap}`,
        dataKey: "retirement_date",
        formatter: helpers.formatDateAsMonthsShort,
      },
      amount_retired: {
        header: t`Amount Retired`,
        cellStyle: styles.row,
        dataKey: "amount_retired",
        formatter: (x: string | number) =>
          helpers.formatTonnes({ amount: Number(x), minimumFractionDigits: 2 }),
      },
      number_of_retirements: {
        header: t`Number of transactions`,
        cellStyle: styles.row,
        dataKey: "number_of_retirements",
        formatter: (x: string | number) => x,
      },
      avgTonnesPerTransaction: {
        header: t`Avg tonnes per transaction`,
        cellStyle: styles.row,
        dataKey: "number_of_retirements",
        formatter: (
          x: string | number,
          item: KlimaMonthlyRetirementsByTokenItem
        ) => {
          return helpers.formatTonnes({
            amount: item.amount_retired / item.number_of_retirements,
          });
        },
      },
    };
  }
  desktopRenderer: DataRendererKey = "horizontal-table";
  mobileRenderer: DataRendererKey = "vertical-table";
}
