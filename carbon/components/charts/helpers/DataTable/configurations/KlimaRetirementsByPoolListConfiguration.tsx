import { RawRetirementsItem } from "lib/charts/types";
import KlimaRetirementsListConfigurationBase from "./KlimaRetirementsListConfigurationBase";
import { Columns } from "./types";

export default class KlimaRetirementsByPoolListConfiguration extends KlimaRetirementsListConfigurationBase {
  getColumns(): Columns<RawRetirementsItem> {
    return {
      beneficiary: this.beneficiaryColumn,
      project_id: this.projectIdColumn,
      token: this.tokenColumn,
      retirement_date: this.retirementDateColumn,
      quantity: this.quantityColumn,
      transaction_id: this.transactionIdColumn,
    };
  }
}
