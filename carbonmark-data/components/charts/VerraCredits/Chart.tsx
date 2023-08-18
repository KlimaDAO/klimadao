"use client"; // use client for recharts animations
import { t } from "@lingui/macro";
import helpers from "lib/charts/helpers";
import { VerraCreditsChartData } from "lib/charts/types";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { palette } from "theme/palette";
import {
  KlimaAreaProps,
  KlimaLegendProps,
  KlimaTooltip,
  KlimaXAxisMonthlyProps,
  KlimaYAxisMillionsOfTonsProps,
} from "../helpers";

interface Props {
  data: VerraCreditsChartData;
}
export default function Chart(props: Props) {
  const payload = [
    {
      id: "c3",
      value: "C3",
      color: palette.charts.color1,
    },
    {
      id: "moss",
      value: "Moss",
      color: palette.charts.color3,
    },
    {
      id: "toucan",
      value: "Toucan",
      color: palette.charts.color5,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={props.data}>
        <XAxis {...KlimaXAxisMonthlyProps(props.data, "date")} />
        <YAxis {...KlimaYAxisMillionsOfTonsProps()} />
        <Tooltip
          content={KlimaTooltip(
            helpers.formatDateAsDays,
            helpers.formatQuantityAsTons
          )}
          cursor={{ fill: "transparent" }}
        />
        {/* @ts-expect-error FIXME: No overload matches this call */}
        <Legend {...KlimaLegendProps({ payload })} />
        {/* @ts-expect-error FIXME: No overload matches this call */}
        <Area
          {...KlimaAreaProps({
            name: t`Toucan`,
            dataKey: "toucan",
            fill: palette.charts.color5,
          })}
        />
        {/* @ts-expect-error FIXME: No overload matches this call */}
        <Area
          {...KlimaAreaProps({
            name: t`Moss`,
            dataKey: "moss",
            fill: palette.charts.color3,
          })}
        />
        {/* @ts-expect-error FIXME: No overload matches this call */}
        <Area
          {...KlimaAreaProps({
            name: t`C3`,
            dataKey: "c3",
            fill: palette.charts.color1,
          })}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
