"use client"; // use client for recharts animations
import { KlimaLegendProps } from "components/charts/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import {
  Cell,
  Legend,
  LegendProps,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { ChartConfigurationItem } from "../Configuration";
import NoDataChartWrapper from "../NoDataChartWrapper";

interface Props<CI extends { quantity: number }, T extends object> {
  data: ChartData<CI>;
  configuration: SimpleChartConfiguration<T>;
  LegendProps?: Omit<LegendProps, "ref">;
  showLegend?: boolean;
  noDataText?: string;
}
/** FIXME: Refactor to KlimaBarChart */
export default function KPieChart<
  CI extends { quantity: number },
  T extends object,
>(props: Props<CI, T>) {
  const locale = currentLocale();
  // Default configuration
  const LocalLegendProps =
    props.LegendProps ||
    Object.assign({}, KlimaLegendProps(props.configuration), {
      verticalAlign: "middle",
      align: "center",
      layout: "vertical",
    });
  const showLegend = props.showLegend === undefined ? true : props.showLegend;

  // Transform data so id and labels from configuration are available to recharts
  const chartData: ChartData<
    ChartConfigurationItem<keyof T> & { quantity: number }
  > = props.data.map((item, i) => {
    const chartOptions = props.configuration[i].chartOptions;
    const record: ChartConfigurationItem<keyof T> & { quantity: number } = {
      id: chartOptions.id,
      color: chartOptions.color,
      label: chartOptions.label || chartOptions.id,
      quantity: item.quantity,
    };
    return record;
  });
  return (
    <NoDataChartWrapper data={chartData} noDataText={props.noDataText}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={props.data}
            dataKey="quantity"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
          >
            {chartData.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Pie>
          {showLegend && <Legend {...LocalLegendProps} />}
        </PieChart>
      </ResponsiveContainer>
    </NoDataChartWrapper>
  );
}
