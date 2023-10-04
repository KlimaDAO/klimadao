"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaTooltip } from "components/charts/helpers";
import { formatPercentage } from "lib/charts/helpers";
import { ChartData } from "lib/charts/types";
import { cloneDeep } from "lodash";
import { useRef } from "react";
import { Cell, Legend, LegendProps, Pie, PieChart, Tooltip } from "recharts";
import ChartWrapper from "../ChartWrapper";
import { ChartConfiguration, ChartConfigurationItem } from "../Configuration";
import { YAxisType, getToolTipYAxisFormatter } from "../props";

interface Props<CI extends { quantity: number }, T extends object> {
  data: ChartData<CI>;
  configuration: ChartConfiguration<keyof T>;
  LegendProps?: Omit<LegendProps, "ref">;
  showLegend?: boolean;
  showPercentageInLegend?: boolean;
  showTooltip?: boolean;
  legendContent?: React.ReactNode;
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
  const total = props.data.reduce((previousValue, item) => {
    return previousValue + item.quantity;
  }, 0);
  // Transform data so id and labels from configuration are available to recharts
  let chartData: ChartData<
    ChartConfigurationItem<keyof T> & { quantity: number }
  > = props.data.map((item, i) => {
    const chartOptions = configuration[i];
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
  chartData = chartData.filter((item) => item.quantity > 0);

  // Conpute legend props
  const localLegendProps =
    props.LegendProps ||
    Object.assign({}, KlimaLegendProps(configuration), {
      align: "center",
      layout: "vertical",
      verticalAlign: "middle",
    });
  const showLegend = props.showLegend === undefined ? true : props.showLegend;
  // legendContent has to be passed as a function to prevent React complaining with verticalAlign. See: https://github.com/recharts/recharts/issues/1448
  const legendContent = props.legendContent
    ? () => {
        return props.legendContent ? props.legendContent : <div></div>;
      }
    : undefined;

  const showTooltip =
    props.showTooltip === undefined ? true : props.showTooltip;

  // Used to programmaticaly show/Hide tooltips see: https://codesandbox.io/s/recharts-programmatically-show-tooltip-bhfnwt?file=/src/App.tsx:666-700
  const chartRef = useRef<any>();
  const legendItemOnMouseOver = (item: any) => {
    if (!chartRef.current) {
      return;
    }

    const formattedGraphicalItems =
      chartRef.current.state.formattedGraphicalItems[0].props.sectors;
    const graphicalItems =
      chartRef.current.state.graphicalItems[0].props.children;
    let activeItem: any = undefined;
    let index = 0;
    for (; index < graphicalItems.length; index++) {
      if (graphicalItems[index].key == item.id) {
        activeItem = formattedGraphicalItems[index];
      }
    }
    if (!activeItem) {
      console.error("check chart state!", chartRef.current.state);
      return;
    }

    chartRef.current.setState(
      {
        activeTooltipIndex: index,
      },
      () => {
        chartRef.current.handleItemMouseEnter(activeItem);
      }
    );
  };
  const legendItemOnMouseLeave = () => {
    if (!chartRef.current) {
      return;
    }
    chartRef.current.setState({
      isTooltipActive: false,
    });
  };
  return (
    <ChartWrapper data={chartData} noDataText={props.noDataText}>
      <PieChart ref={chartRef}>
        <Pie
          data={props.data}
          dataKey="quantity"
          nameKey="label"
          innerRadius="93%"
          outerRadius="100%"
        >
          {chartData.map((entry) => (
            <Cell key={entry.id} fill={entry.color} name={entry.label} />
          ))}
        </Pie>
        {showTooltip && (
          <Tooltip
            {...{
              content: KlimaTooltip({
                yAxisFormatter: getToolTipYAxisFormatter(props.YAxis),
              }),
              cursor: { fill: "transparent" },
            }}
          />
        )}
        {showLegend && (
          <Legend
            {...localLegendProps}
            content={legendContent}
            onMouseOver={legendItemOnMouseOver}
            onMouseLeave={legendItemOnMouseLeave}
          />
        )}
      </PieChart>
    </ChartWrapper>
  );
}
