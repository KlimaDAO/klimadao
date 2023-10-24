import { t } from "@lingui/macro";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import {
  queryAggregatedCredits,
  queryAggregatedCreditsByBridgeAndOrigin,
} from "lib/charts/queries";
import {
  AggregatedCreditsByBridgeAndOriginItem,
  CreditsQueryParams,
  SortQueryParams,
} from "lib/charts/types";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import { Columns, DataRendererProps } from "./types";

export default class VerraCreditsOriginsListConfiguration extends AbstractTableConfiguration<
  AggregatedCreditsByBridgeAndOriginItem,
  CreditsQueryParams
> {
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
        } as SortQueryParams,
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
        item.percentage = item.total_bridged / item.total_quantity;
      }
    });
    return data;
  }
  getColumns(
    params?: CreditsQueryParams
  ): Columns<AggregatedCreditsByBridgeAndOriginItem> {
    return {
      country: {
        header: t`Country`,
        cellStyle: layout.blockLeft,
        dataKey: "country",
        formatter: (x: string) => x,
      },
      toucan: {
        header:
          params?.status == "issued"
            ? t`Toucan bridged VCUs`
            : t`Toucan retired VCUs`,
        cellStyle: layout.blockRight,
        dataKey: "toucan_quantity",
        formatter: this.formatTonnes,
      },
      moss: {
        header:
          params?.status == "issued"
            ? t`Moss bridged VCUs`
            : t`Moss retired VCUs`,
        cellStyle: layout.blockRight,
        dataKey: "moss_quantity",
        formatter: this.formatTonnes,
      },
      c3: {
        header:
          params?.status == "issued" ? t`C3 bridged VCUs` : t`C3 retired VCUs`,
        cellStyle: layout.blockRight,
        dataKey: "c3_quantity",
        formatter: this.formatTonnes,
      },
      tokenized: {
        header:
          params?.status == "issued"
            ? t`Total tokenized VCUs`
            : t`Total retired VCUs onchain`,
        cellStyle: layout.blockRight,
        dataKey: "total_bridged",
        formatter: this.formatTonnes,
      },
      issued: {
        header:
          params?.status == "issued"
            ? t`Total issued VCUs`
            : t`Total retired VCUs`,
        cellStyle: layout.blockRight,
        dataKey: "total_quantity",
        formatter: this.formatTonnes,
      },
      percentage: {
        header:
          params?.status == "issued"
            ? t`Percentage tokenized`
            : t`Percentage retired offchain`,
        cellStyle: layout.blockRight,
        dataKey: "percentage",
        formatter: (x: number) =>
          formatPercentage({ value: x, fractionDigits: 1 }),
      },
    };
  }
  formatTonnes = (x: number) => {
    return formatTonnes({ amount: x, maximumFractionDigits: 0 });
  };
  desktopRenderer = (
    props: DataRendererProps<
      AggregatedCreditsByBridgeAndOriginItem,
      CreditsQueryParams
    >
  ) => {
    return this.VerticalTableLayout(props);
  };
  mobileRenderer = (
    props: DataRendererProps<
      AggregatedCreditsByBridgeAndOriginItem,
      CreditsQueryParams
    >
  ) => {
    return <></>;
  };
}
