import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import {
  Cell,
  Pie,
  PieChart,
  Sector,
  SectorProps,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Text } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";

import { CategoryWithPercent } from ".";
import * as styles from "./styles";

export type FootprintChartProps = {
  data: CategoryWithPercent[];
};

const renderActiveIndex = (props: SectorProps) => (
  <g>
    <Sector
      cx={props.cx}
      cy={props.cy}
      innerRadius={props.innerRadius}
      outerRadius={props.outerRadius && props.outerRadius + 10}
      startAngle={props.startAngle}
      endAngle={props.endAngle}
      stroke={props.stroke}
      fill={props.fill}
    />
  </g>
);

export const FootprintChart: FC<FootprintChartProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number>(33);

  const onSectorLeave = (): void => setActiveIndex(33);
  const onSectorEnter = (_data: CategoryWithPercent, index: number): void =>
    setActiveIndex(index);

  return (
    <PieChart width={200} height={200}>
      <Tooltip
        content={
          <CustomTooltip
            viewBox={{ x: 100, y: 100, width: 400, height: 400 }}
          />
        }
      />
      <Pie
        data={props.data}
        nameKey="name"
        dataKey="percent"
        stroke="var(--surface-02)"
        fill="var(--klima-green)"
        outerRadius={90}
        innerRadius={72}
        paddingAngle={1.5}
        isAnimationActive={true}
        activeIndex={activeIndex}
        activeShape={renderActiveIndex}
        onMouseEnter={onSectorEnter}
        onMouseLeave={onSectorLeave}
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={`${entry.fill}`} />
        ))}
      </Pie>
    </PieChart>
  );
};

export const PlaceholderFootprintChart: FC = () => (
  <PieChart width={200} height={200}>
    <Pie
      data={[{ name: "Example", percent: 100 }]}
      nameKey="name"
      dataKey="percent"
      stroke="var(--surface-01)"
      fill="var(--surface-01)"
      outerRadius={90}
      innerRadius={72}
    />
  </PieChart>
);

const CustomTooltip: FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  const { locale } = useRouter();

  if (active && payload && payload.length) {
    return (
      <div className={styles.footprintChart_tooltip}>
        <Text t="caption" uppercase>
          {payload[0].name}
        </Text>
        <Text t="caption" color="lightest">
          <Trans id="pledges.dashboard.footprint.tooltip.category_percent">
            {trimWithLocale(payload[0].payload.percent, 2, locale)}% of
            footprint
          </Trans>
        </Text>
        <Text t="caption" color="lightest">
          <Trans id="pledges.dashboard.footprint.tooltip.quantity">
            {payload[0].payload.quantity} Carbon Tonne(s)
          </Trans>
        </Text>
      </div>
    );
  }

  return null;
};
