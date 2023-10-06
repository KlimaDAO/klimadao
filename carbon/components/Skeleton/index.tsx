import { t } from "@lingui/macro";
import styles from "./styles.module.scss";
export default function Skeleton(props: {
  className?: string;
  text?: string;
  height?: number;
}) {
  const text = props.text === undefined ? t`Fetching data…` : props.text;
  const style = props.height
    ? {
        minHeight: props.height,
      }
    : {};
  return (
    <div className={styles.skeleton + " " + props.className} style={style}>
      <p>{text}</p>
    </div>
  );
}
