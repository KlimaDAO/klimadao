import styles from "./styles.module.css";
export default function Skeleton(props: { className?: string }) {
  return (
    <div className={styles.skeleton + " " + props.className}>
      <p>Fetching data...</p>
    </div>
  );
}
