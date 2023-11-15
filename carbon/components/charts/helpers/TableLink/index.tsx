import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "components/Link";

import styles from "./styles.module.scss";

export default function TableLink(props: { label: string; href: string }) {
  return (
    <Link href={props.href} className={styles.tableLink}>
      <span>{props.label}</span>
      <ArrowForwardIcon fontSize="medium" />
    </Link>
  );
}
