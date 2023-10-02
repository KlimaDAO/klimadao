"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaTooltip } from "components/charts/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { formatPercentage } from "lib/charts/helpers";
import { ChartData } from "lib/charts/types";
import { cloneDeep } from "lodash";
import { Cell, Legend, LegendProps, Pie, PieChart, Tooltip } from "recharts";
import { ContentType } from "recharts/types/component/DefaultLegendContent";
import ChartWrapper from "../ChartWrapper";
import { ChartConfigurationItem } from "../Configuration";
import { YAxisType, getToolTipYAxisFormatter } from "../props";

interface Props<CI extends { quantity: number }, T extends object> {
  data: ChartData<CI>;
  configuration: SimpleChartConfiguration<T>;
  LegendProps?: Omit<LegendProps, "ref">;
  showLegend?: boolean;
  showPercentageInLegend?: boolean;
  legendContent?: ContentType;
  noDataText?: string;
  YAxis?: YAxisType;
}
/** FIXME: Refactor to KlimaBarChart */
export default function KPieChart<
  CI extends { quantity: number },
  T extends object,
>(props: Props<CI, T>) {
  // Copy configuration because we are going to alter it
  const configuration = cloneDeep(props.configuration);
  // Default configuration
  const LocalLegendProps =
    props.LegendProps ||
    Object.assign({}, KlimaLegendProps(configuration), {
      verticalAlign: "middle",
      align: "center",
      layout: "vertical",
    });
  const showLegend = props.showLegend === undefined ? true : props.showLegend;
  const nonZeroData = props.data.filter((item) => item.quantity > 0);
  const total = nonZeroData.reduce((previousValue, item) => {
    return previousValue + item.quantity;
  }, 0);
  // Transform data so id and labels from configuration are available to recharts
  const chartData: ChartData<
    ChartConfigurationItem<keyof T> & { quantity: number }
  > = nonZeroData.map((item, i) => {
    const chartOptions = configuration[i].chartOptions;
    let label = chartOptions.label || chartOptions.id;
    if (props.showPercentageInLegend) {
      const percentage = formatPercentage({
        value: item.quantity / total,
        fractionDigits: 2,
      });
      label = `${percentage} ${label}`;
    }
    const record: ChartConfigurationItem<keyof T> & { quantity: number } = {
      id: chartOptions.id,
      color: chartOptions.color,
      label: label,
      quantity: item.quantity,
    };
    chartOptions.label = label;
    return record;
  });

  return (
    <ChartWrapper data={nonZeroData} noDataText={props.noDataText}>
      <PieChart>
        <Pie
          data={props.data}
          dataKey="quantity"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius="93%"
          outerRadius="100%"
        >
          {chartData.map((entry) => (
            <Cell key={entry.id} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          {...{
            content: KlimaTooltip({
              yAxisFormatter: getToolTipYAxisFormatter(props.YAxis),
            }),
            cursor: { fill: "transparent" },
          }}
        />
        {showLegend && (
          <Legend {...LocalLegendProps} content={props.legendContent} />
        )}
      </PieChart>
    </ChartWrapper>
  );
}
