import { t } from "@lingui/macro";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import {
  queryAggregatedCredits,
  queryAggregatedCreditsByBridgeAndOrigin,
} from "lib/charts/queries";
import {
  AggregatedCreditsByBridgeAndOriginItem,
  CreditsQueryParams,
  PaginatedResponse,
} from "lib/charts/types";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import { Columns } from "./types";

export default class VerraCreditsOriginsListConfiguration extends AbstractTableConfiguration<AggregatedCreditsByBridgeAndOriginItem> {
  async fetchFunction(page: number, params?: CreditsQueryParams) {
    const total = (await queryAggregatedCredits({ bridge: "offchain" }))
      .quantity;

    const data = await queryAggregatedCreditsByBridgeAndOrigin(
      Object.assign(
        {},
        {
          sort_by: "total_quantity",
          sort_order: "desc",
          page_size: 10,
          page,
        },
        params
      )
    );
    data.items.forEach((item) => {
      item.total_bridged = 0;
      item.percentage = 0;
      if (
        item.c3_quantity !== undefined &&
        item.toucan_quantity !== undefined &&
        item.moss_quantity !== undefined &&
        item.total_quantity !== undefined
      ) {
        item.total_bridged =
          item.c3_quantity + item.toucan_quantity + item.moss_quantity;
        item.percentage = item.total_quantity / total;
      }
    });
    return data;
  }
  getColumns(): Columns<AggregatedCreditsByBridgeAndOriginItem> {
    return {
      country: {
        header: t`Country`,
        cellStyle: layout.textLeft,
        dataKey: "country",
        formatter: (x: string) => x,
      },
      toucan: {
        header: t`Toucan bridged VCUs`,
        cellStyle: layout.textRight,
        dataKey: "toucan_quantity",
        formatter: this.formatTonnes,
      },
      moss: {
        header: t`Moss bridged VCUs`,
        cellStyle: layout.textRight,
        dataKey: "moss_quantity",
        formatter: this.formatTonnes,
      },
      c3: {
        header: t`C3 bridged VCUs`,
        cellStyle: layout.textRight,
        dataKey: "c3_quantity",
        formatter: this.formatTonnes,
      },
      tokenized: {
        header: t`Total tokenized VCUs`,
        cellStyle: layout.textRight,
        dataKey: "total_bridged",
        formatter: this.formatTonnes,
      },
      issued: {
        header: t`Verra credits issued`,
        cellStyle: layout.textRight,
        dataKey: "total_quantity",
        formatter: this.formatTonnes,
      },
      percentage: {
        header: t`Precentage`,
        cellStyle: layout.textRight,
        dataKey: "percentage",
        formatter: (x: number) =>
          formatPercentage({ value: x, fractionDigits: 1 }),
      },
    };
  }
  formatTonnes = (x: number) => {
    return formatTonnes({ amount: x, maximumFractionDigits: 0 });
  };
  desktopRenderer = (props: {
    data: PaginatedResponse<AggregatedCreditsByBridgeAndOriginItem>;
  }) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
  mobileRenderer = (props: {
    data: PaginatedResponse<AggregatedCreditsByBridgeAndOriginItem>;
  }) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
}
