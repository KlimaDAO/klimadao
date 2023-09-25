import styles from "./styles.module.scss";

/** Renders a legend item
 * color: color of the dot
 * text: Text accompanying the dot
 */
export default function CustomLegendItem(props: {
  color: string;
  text: React.ReactNode;
}) {
  return (
    <div className={styles.legendItem}>
      <span
        className={styles.dot}
        style={{ backgroundColor: props.color }}
      ></span>
      {props.text}
    </div>
  );
}
