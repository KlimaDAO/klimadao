import { t } from "@lingui/macro";
import Table, { Columns } from "components/Table";
import { helpers } from "lib/charts";
import { queryRawKlimaRetirements } from "lib/charts/queries";
import { RawRetirementsItem } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
/** Async server component that renders a Recharts client component */
export default function KlimaDAORetirementsCard() {
  const locale = currentLocale();
  function fetchFunction(page: number) {
    return queryRawKlimaRetirements({
      sort_by: "retirement_date",
      sort_order: "desc",
      page_size: 10,
      page,
    });
  }
  const columns: Columns<RawRetirementsItem> = [
    {
      header: t`Date`,
      dataKey: "retirement_date",
      formatter: helpers.formatDateAndTime(locale),
    },
  ];
  /* @ts-expect-error async Server component */
  return <Table fetchFunction={fetchFunction} columns={columns}></Table>;
}
