"use client"; // use client for recharts animations
import { KlimaStackedBars } from "components/charts/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { ChartData } from "lib/charts/types";
import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import NoDataChartWrapper from "../NoDataChartWrapper";

interface Props<T extends object> {
  data: ChartData<T>;
  configuration: SimpleChartConfiguration<T>;
  noDataText?: string;
}
/** FIXME: Refactor to KlimaHorizontalStackedBarChart */
export default function KHorizontalStackedBarChart<T extends object>(
  props: Props<T>
) {
  return (
    <NoDataChartWrapper data={props.data} noDataText={props.noDataText}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={props.data}
          layout="vertical"
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          barGap={0}
          barCategoryGap={0}
        >
          <YAxis dataKey="" type="category" hide={true} />
          <XAxis type="number" hide={true} />
          {KlimaStackedBars(props.configuration)}
        </BarChart>
      </ResponsiveContainer>
    </NoDataChartWrapper>
  );
}
