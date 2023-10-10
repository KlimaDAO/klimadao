import { t } from "@lingui/macro";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import styles from "./styles.module.scss";

export function KlimaTooltip(params: {
  xAxisFormatter?: (v: number) => string;
  yAxisFormatter?: (v: number) => string;
}) {
  function KlimaTooltipComponent<
    TValue extends ValueType,
    TName extends NameType,
  >(props: TooltipProps<TValue, TName>) {
    const { active, payload, label } = props;

    console.log(payload?.map((p) => p.color));

    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          {params.xAxisFormatter && (
            <p className={styles.date}>{params.xAxisFormatter(label)}</p>
          )}
          <div className={styles.tooltipItems}>
            {payload.map((pld) => (
              <div key={pld.name}>
                <div className={styles.payloadName}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: pld.color }}
                  ></span>
                  {pld.payload?.name || pld.name}
                </div>
                <div>
                  {pld.value !== undefined &&
                    params.yAxisFormatter &&
                    params.yAxisFormatter(pld.value as number) + t`T`}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }
  return KlimaTooltipComponent;
}
