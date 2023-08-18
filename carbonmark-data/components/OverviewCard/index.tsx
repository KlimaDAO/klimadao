import ArrowForward from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import styles from "./styles.module.css";

/**
 * A UI layout component to position content in a white card with hyperlinks and title.
 */
export default function OverviewCard(props: {
  children: React.ReactNode;
  title: string;
  href?: string;
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2>{props.title}</h2>
        {props.href && (
          <Link className={styles.detailsLink} href={props.href}>
            Details{" "}
            <ArrowForward
              fontSize="small"
              className={styles.detailsLinkArrow}
            />
          </Link>
        )}
      </div>
      <div className={styles.cardContent}>{props.children}</div>
    </div>
  );
}
