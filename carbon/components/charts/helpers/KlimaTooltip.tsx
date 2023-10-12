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

    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          {params.xAxisFormatter && <p>{params.xAxisFormatter(label)}</p>}
          <div className={styles.tooltipItems}>
            {payload.map((pld) => (
              <div key={pld.name}>
                <div>{pld.payload?.name || pld.name}</div>
                <div style={{ color: pld.color }}>
                  {pld.value !== undefined &&
                    params.yAxisFormatter &&
                    params.yAxisFormatter(pld.value as number)}
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
