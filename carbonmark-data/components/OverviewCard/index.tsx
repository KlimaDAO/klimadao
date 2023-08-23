import ArrowForward from "@mui/icons-material/ArrowForward";
import Link from "components/Link";
import styles from "./styles.module.css";

/**
 * A UI layout component to position content in a white card with hyperlinks and title.
 */
export default function OverviewCard(props: {
  children: React.ReactNode;
  title: string;
  detailUrl?: string;
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h5 className={styles.cardTitle}>{props.title}</h5>
        <Link href={props.detailUrl} className={styles.cardDetailsLink}>
          Details <ArrowForward />
        </Link>
      </div>
      <div className={styles.cardContent}>{props.children}</div>
    </div>
  );
}
