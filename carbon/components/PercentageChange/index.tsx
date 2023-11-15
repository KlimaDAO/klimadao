import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
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
      <ArrowDropUpIcon color={"success"} />
    ) : (
      <ArrowDropDownIcon color={"error"} />
    );
  return (
    <span className={styles.priceChangeValue}>
      {icon}
      {formatPercentage({ value: Math.abs(percentage), fractionDigits })}
    </span>
  );
}
