import Link from "next/link";
import styles from "./styles.module.css";

/**
 * A UI layout component to position content in a white card with hyperlinks and title.
 */
export default function OverviewCard(props: {
  children: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2>{props.title}</h2>
        <Link href={props.href}>Details👉</Link>
      </div>
      <div className={styles.cardContent}>{props.children}</div>
    </div>
  );
}
