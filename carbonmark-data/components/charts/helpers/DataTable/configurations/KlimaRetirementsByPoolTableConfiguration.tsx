import { t } from "@lingui/macro";
import { helpers } from "lib/charts";
import { queryKlimaMonthlyRetirementsByPool } from "lib/charts/queries";
import {
  KlimaMonthlyRetirementsItem,
  PaginatedResponse,
} from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import styles from "./styles.module.scss";

import { Columns } from "./types";

export default class KlimaRetirementsByPoolTableConfiguration extends AbstractTableConfiguration<KlimaMonthlyRetirementsItem> {
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
  getColumns(): Columns<KlimaMonthlyRetirementsItem> {
    const locale = currentLocale();
    return {
      retirement_date: {
        header: "",
        cellStyle: `${styles.header} ${layout.nowrap}`,
        dataKey: "retirement_date",
        formatter: helpers.formatDateAsMonthsShort(locale),
      },
      amount_retired: {
        header: t`Amount Retired`,
        cellStyle: styles.row,
        dataKey: "amount_retired",
        formatter: helpers.formatTonnes,
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
        formatter: (x: string | number, item: KlimaMonthlyRetirementsItem) => {
          return helpers.formatTonnes(
            item.amount_retired / item.number_of_retirements
          );
        },
      },
    };
  }
  desktopRenderer = (props: {
    data: PaginatedResponse<KlimaMonthlyRetirementsItem>;
  }) => {
    return this.HorizontalTableLayout({
      data: props.data,
    });
  };
  mobileRenderer = (props: {
    data: PaginatedResponse<KlimaMonthlyRetirementsItem>;
  }) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
}
