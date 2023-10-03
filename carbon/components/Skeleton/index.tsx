import { t } from "@lingui/macro";
import styles from "./styles.module.scss";
export default function Skeleton(props: { className?: string; text?: string }) {
  const text = props.text === "undefined" ? t`Fetching data...` : props.text;
  return (
    <div className={styles.skeleton + " " + props.className}>
      <p>{text}</p>
    </div>
  );
}
