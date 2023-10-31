"use client"; // use client for recharts animations
import { t } from "@lingui/macro";
import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { TreeMapData } from "lib/charts/types";
import { Tooltip, TooltipProps, Treemap } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import layout from "theme/layout.module.scss";
import ChartWrapper from "../helpers/ChartWrapper";
import TreeMapItem from "../helpers/TreeMapItem";
import styles from "../helpers/styles.module.scss";

interface Props<RI> extends TokenDetailsProps {
  data: TreeMapData<RI>;
  dataKey: Extract<keyof RI, string>;
}
export default function DistributionOfProjectsChart<RI>(props: Props<RI>) {
  return (
    <ChartWrapper data={props.data} className={layout.noOverflow}>
      <Treemap
        data={props.data}
        dataKey={props.dataKey}
        aspectRatio={1}
        content={<TreeMapItem />}
      >
        <Tooltip content={TreeMapTooltip(props)} />
      </Treemap>
    </ChartWrapper>
  );
}

interface TooltipItemProps {
  label: string;
  value: React.ReactNode;
}
function TreeMapTooltip(params: TokenDetailsProps) {
  function TreeMapTooltipComponent<
    TValue extends ValueType,
    TName extends NameType,
  >(props: TooltipProps<TValue, TName>) {
    if (props.active && props.payload && props.payload.length) {
      const payload = props.payload[0].payload;
      const percentage = formatPercentage({
        value: payload.bridge_ratio,
        fractionDigits: 2,
      });
      const localFormatTonnes = (amount: number) =>
        formatTonnes({
          amount,
          maximumFractionDigits: 0,
        });
      const total = localFormatTonnes(payload.total_quantity);
      const tokenized = localFormatTonnes(payload.bridge_quantity);

      const toolTipItems: Array<TooltipItemProps> = [];
      // Offchain issued
      if (params.bridge == "offchain" && params.status == "issued") {
        toolTipItems.push({ label: t`Total Issued VCUs`, value: total });
        toolTipItems.push({ label: t`Tokenized VCUs`, value: tokenized });
        toolTipItems.push({
          label: t`Percentage of tokenized VCUs`,
          value: percentage,
        });
      }
      // Offchain retired
      if (params.bridge == "offchain" && params.status == "all_retired") {
        toolTipItems.push({ label: t`Total retired VCUs`, value: total });
        toolTipItems.push({
          label: t`Total retired VCUs offchain`,
          value: tokenized,
        });
        toolTipItems.push({
          label: t`Percentage of VCUs retired offchain`,
          value: percentage,
        });
      }
      // C3
      if (params.bridge == "c3") {
        if (params.pool === "all") {
          toolTipItems.push({
            label:
              params.status == "bridged"
                ? t`C3 bridged VCUs`
                : t`C3 retired VCUs`,
            value: localFormatTonnes(payload.total_quantity),
          });
        }
        if (params.pool === "all" || params.pool == "ubo") {
          toolTipItems.push({
            label:
              params.status == "bridged"
                ? t`UBO pooled VCUs`
                : t`UBO retired VCUs`,
            value: localFormatTonnes(payload.ubo_quantity),
          });
        }
        if (params.pool === "all" || params.pool == "nbo") {
          toolTipItems.push({
            label:
              params.status == "bridged"
                ? t`NBO pooled VCUs`
                : t`NBO retired VCUs`,
            value: localFormatTonnes(payload.nbo_quantity),
          });
        }
      }
      // Toucan
      if (params.bridge == "toucan") {
        if (params.pool === "all") {
          toolTipItems.push({
            label:
              params.status == "bridged"
                ? t`Toucan bridged VCUs`
                : t`Toucan retired VCUs`,
            value: localFormatTonnes(payload.total_quantity),
          });
        }
        if (params.pool === "all" || params.pool == "bct") {
          toolTipItems.push({
            label:
              params.status == "bridged"
                ? t`BCT pooled VCUs`
                : t`BCT retired VCUs`,
            value: localFormatTonnes(payload.bct_quantity),
          });
        }
        if (params.pool === "all" || params.pool == "nct") {
          toolTipItems.push({
            label:
              params.status == "bridged"
                ? t`NCT pooled VCUs`
                : t`NCT retired VCUs`,
            value: localFormatTonnes(payload.nct_quantity),
          });
        }
      }
      // Moss
      if (params.bridge == "moss") {
        toolTipItems.push({
          label:
            params.status == "bridged"
              ? t`Moss bridged VCUs`
              : t`Moss retired VCUs`,
          value: localFormatTonnes(payload.total_quantity),
        });
      }

      return (
        <div className={styles.tooltip}>
          <p className={styles.date}>{payload.name}</p>
          <div className={styles.tooltipItems}>
            {toolTipItems.map((item, index) => (
              <div key="index">
                <div className={styles.payloadName}>{item.label}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  return TreeMapTooltipComponent;
}
