import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import styles from "./styles.module.scss";

export function KlimaTooltip(
  xAxisFormatter: (v: number) => string,
  yAxisFormatter: (v: number) => string
) {
  function KlimaTooltipComponent<
    TValue extends ValueType,
    TName extends NameType,
  >(props: TooltipProps<TValue, TName>) {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p>{xAxisFormatter(label)}</p>
          <div className={styles.tooltipItems}>
            {payload.map((pld) => (
              <div key={pld.name}>
                <div>{pld.name}</div>
                <div style={{ color: pld.color }}>
                  {pld.value && yAxisFormatter(pld.value as number)}
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
