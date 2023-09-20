import { t } from "@lingui/macro";
import { queryAggregatedCreditsByCountry } from "lib/charts/queries";
import {
  AggregatedCreditsByCountryItem,
  CreditsQueryParams,
  PaginatedResponse,
} from "lib/charts/types";
import layout from "theme/layout.module.scss";
import AbstractTableConfiguration from "./AbstractTableConfiguration";
import { formatTonnes } from "./helpers";
import { Columns } from "./types";

export default class TokenOriginsListConfiguration extends AbstractTableConfiguration<AggregatedCreditsByCountryItem> {
  fetchFunction(page: number, params?: CreditsQueryParams) {
    return queryAggregatedCreditsByCountry(
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
  getColumns(): Columns<AggregatedCreditsByCountryItem> {
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
  desktopRenderer = (props: {
    data: PaginatedResponse<AggregatedCreditsByCountryItem>;
  }) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
  mobileRenderer = (props: {
    data: PaginatedResponse<AggregatedCreditsByCountryItem>;
  }) => {
    return this.VerticalTableLayout({
      data: props.data,
    });
  };
}
