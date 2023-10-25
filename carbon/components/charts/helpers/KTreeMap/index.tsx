"use client"; // use client for recharts animations
import { t } from "@lingui/macro";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { TreeMapData } from "lib/charts/types";
import { Tooltip, TooltipProps, Treemap } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import ChartWrapper from "../ChartWrapper";
import TreeMapItem from "../TreeMapItem";
import styles from "../styles.module.scss";

interface Props<RI> {
  data: TreeMapData<RI>;
  dataKey: Extract<keyof RI, string>;
}
export default function KTreeMap<RI>(props: Props<RI>) {
  return (
    <ChartWrapper data={props.data}>
      <Treemap
        data={props.data}
        dataKey={props.dataKey}
        aspectRatio={1}
        content={<TreeMapItem />}
      >
        <Tooltip content={<TreeMapTooltip />} />
      </Treemap>
    </ChartWrapper>
  );
}

function TreeMapTooltipItem(props: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className={styles.payloadName}>{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
}
function TreeMapTooltip<TValue extends ValueType, TName extends NameType>(
  props: TooltipProps<TValue, TName>
) {
  if (props.active && props.payload && props.payload.length) {
    const payload = props.payload[0].payload;
    const percentage = formatPercentage({
      value: payload.bridge_ratio,
      fractionDigits: 2,
    });
    const issued = formatTonnes({
      amount: payload.total_quantity,
      maximumFractionDigits: 0,
    });
    const tokenized = formatTonnes({
      amount: payload.bridge_quantity,
      maximumFractionDigits: 0,
    });

    return (
      <div className={styles.tooltip}>
        <p className={styles.date}>{payload.name}</p>
        <div className={styles.tooltipItems}>
          <TreeMapTooltipItem label={t`Issued VCUs`} value={issued} />
          <TreeMapTooltipItem label={t`Tokenized VCUs`} value={tokenized} />
          <TreeMapTooltipItem
            label={t`Percentage tokenized`}
            value={percentage}
          />
        </div>
      </div>
    );
  }

  return null;
}
