import { t } from "@lingui/macro";
import { queryAggregatedCreditsByOrigin } from "lib/charts/queries";
import {
  AggregatedCreditsByOriginItem,
  CreditsQueryParams,
} from "lib/charts/types";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import { formatTonnes } from "./helpers";
import { Columns, DataRendererProps } from "./types";

export default class TokenOriginsListConfiguration extends AbstractTableConfiguration<
  AggregatedCreditsByOriginItem,
  CreditsQueryParams
> {
  fetchFunction(page: number, params?: CreditsQueryParams) {
    return queryAggregatedCreditsByOrigin(
      Object.assign(
        {},
        {
          sort_by: "quantity",
          sort_order: "desc",
          page_size: 10,
          page,
        },
        params
      )
    );
  }
  getColumns(): Columns<AggregatedCreditsByOriginItem> {
    return {
      country: {
        header: t`Country`,
        cellStyle: layout.textLeft,
        dataKey: "country",
        formatter: (x: string) => x,
      },
      countryCode: {
        header: t`Country`,
        cellStyle: layout.textLeft,
        dataKey: "country_code",
        formatter: (x: string) => x,
      },
      amount_retired: {
        header: t`Amount retired`,
        cellStyle: layout.textRight,
        dataKey: "quantity",
        formatter: formatTonnes,
      },
    };
  }
  desktopRenderer = (
    props: DataRendererProps<AggregatedCreditsByOriginItem, CreditsQueryParams>
  ) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
  mobileRenderer = (
    props: DataRendererProps<AggregatedCreditsByOriginItem, CreditsQueryParams>
  ) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
}
