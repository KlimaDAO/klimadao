import { queryAllRawRetirements } from "lib/charts/queries";
import { RawRetirementsItem, SortQueryParams } from "lib/charts/types";
import layout from "theme/layout.module.scss";
import KlimaRetirementsListConfigurationBase from "./KlimaRetirementsListConfigurationBase";

import { t } from "@lingui/macro";
import TableLink from "../../TableLink";
import { Columns } from "./types";
export default class KlimaRetirementsByChainListConfiguration extends KlimaRetirementsListConfigurationBase {
  fetchFunction(page: number, params?: SortQueryParams) {
    return queryAllRawRetirements({
      ...{
        sort_by: "retirement_date",
        sort_order: "desc",
        page_size: 10,
        page,
      },
      ...params,
    });
  }
  getColumns(): Columns<RawRetirementsItem> {
    const columns: Columns<RawRetirementsItem> = {
      beneficiary: this.beneficiaryColumn,
      on_off_chain: {
        header: t`On/Off chain`,
        cellStyle: layout.textCenter,
        dataKey: "origin",
        formatter: (x: string) => (x == "Klima" ? t`On-chain` : t`Off-chain`),
      },
      project_id: this.projectIdColumn,
      retirement_date: this.retirementDateColumn,
      quantity: this.quantityColumn,
      transaction_id: {
        header: t`Proof`,
        cellStyle: `${layout.blockRight} ${layout.textRight}`,
        dataKey: "transaction_id",
        formatter: (x: string, item: RawRetirementsItem) =>
          item.origin == "Klima" ? (
            <TableLink
              label={"Polygonscan"}
              href={`https://polygonscan.com/tx/${x}`}
            />
          ) : (
            item.serial_number
          ),
      },
    };
    columns.beneficiary.header = t`Beneficiary`;
    return columns;
  }
}
