import { t } from "@lingui/macro";
import { RawRetirementsItem } from "lib/charts/types";
import layout from "theme/layout.module.scss";
import KlimaRetirementsByTokenListConfigurationBase from "./KlimaRetirementsByListConfigurationBase";
import { Columns } from "./types";

export default class KlimaRetirementsByTokenListConfiguration extends KlimaRetirementsByTokenListConfigurationBase {
  getColumns(): Columns<RawRetirementsItem> {
    const columns = super.getColumns();
    columns["token"] = {
      header: t`Token`,
      cellStyle: layout.textCenter,
      dataKey: "token",
      formatter: (x: string | number) => {
        if (x == "BCT" || x == "NCT") return "TCO2";
        if (x == "UBO" || x == "NBO") return "C3T";
        return "";
      },
    };
    return columns;
  }
}
