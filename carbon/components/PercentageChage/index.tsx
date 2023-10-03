import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { formatPercentage } from "lib/charts/helpers";
import styles from "./styles.module.scss";

export default function PercentageChange(props: {
  previousValue: number;
  currentValue: number;
  fractionDigits?: number;
}) {
  const fractionDigits = props.fractionDigits || 0;
  const percentage =
    (props.previousValue - props.currentValue) / props.previousValue;

  const icon =
    percentage > 0 ? (
      <ArrowDropUp color={"success"}></ArrowDropUp>
    ) : (
      <ArrowDropDown color={"error"}></ArrowDropDown>
    );
  return (
    <span className={styles.priceChangeValue}>
      {icon}
      {formatPercentage({ value: percentage, fractionDigits })}
    </span>
  );
}
