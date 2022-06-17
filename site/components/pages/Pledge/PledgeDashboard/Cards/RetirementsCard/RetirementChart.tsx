import React, { FC } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import keys from "lodash/keys";
import { Text } from "@klimadao/lib/components";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import BCTIcon from "public/icons/BCT.png";
import NCTIcon from "public/icons/NCT.png";
import MCO2Icon from "public/icons/MCO2.png";
import NBOIcon from "public/icons/NBO.png";
import UBOIcon from "public/icons/UBO.png";
import * as styles from "./styles";

type Props = {
  retirements: RetirementsTotalsAndBalances;
};

type Token = keyof typeof tokenIconMap;
type RetirementChartData = {
  name: Token;
  tonnesRetired: string;
}[];

const tokenIconMap = {
  bct: BCTIcon,
  nct: NCTIcon,
  mco2: MCO2Icon,
  nbo: NBOIcon,
  ubo: UBOIcon,
};

const tokens = keys(tokenIconMap) as Token[];

export const RetirementsChart: FC<Props> = (props) => {
  const mappedData: RetirementChartData = tokens.map((token: Token) => ({
    name: token,
    tonnesRetired: props.retirements[token],
  }));

  const yDomainMax: number = mappedData
    .map((token) => Number(token.tonnesRetired))
    .sort((a, b) => a + b)[0];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={mappedData}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="10%"
              stopColor="var(--klima-green)"
              stopOpacity={0.8}
            />
            <stop
              offset="85%"
              stopColor="var(--klima-green)"
              stopOpacity={0.125}
            />
          </linearGradient>
        </defs>
        <Bar
          dataKey="tonnesRetired"
          fill="url(#gradient)"
          maxBarSize={100}
          radius={[5, 5, 0, 0]}
        >
          <LabelList
            dataKey="name"
            position="bottom"
            offset={55}
            fill="var(--font-01)"
            fontSize="1.6rem"
            formatter={(label: string) => label.toUpperCase()}
          />
        </Bar>
        <Tooltip
          cursor={false}
          content={
            <CustomTooltip
              viewBox={{ x: 100, y: 100, width: 400, height: 400 }}
            />
          }
        />
        <XAxis
          dataKey="name"
          type="category"
          height={70}
          tickLine={false}
          tick={<TokenLabel />}
        />
        <YAxis dataKey="tonnesRetired" hide={true} domain={[0, yDomainMax]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Not typed by recharts and can't find the correct type definitions for render prop pattern
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenLabel: FC<any> = (props) => {
  const tokenName: Token = props.payload.value;

  return (
    // offset to x is half of image width to center icon on bar chart
    <g transform={`translate(${props.x - 20},${props.y})`}>
      <image
        height="4rem"
        width="4rem"
        xlinkHref={tokenIconMap[tokenName].src}
      />
    </g>
  );
};

const CustomTooltip: FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.chart_tooltip}>
        <Text t="caption" uppercase>
          {payload[0].payload.name}
        </Text>
        <Text t="caption" color="lightest">
          {+Number(payload[0].value).toFixed(2)} Carbon Tonne(s) retired
        </Text>
      </div>
    );
  }

  return null;
};
