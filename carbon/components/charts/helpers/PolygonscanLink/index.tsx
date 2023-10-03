import { ArrowForward } from "@mui/icons-material";
import Link from "components/Link";

import styles from "./styles.module.scss";

/** Async server component that renders a Recharts client component */
export default function PolygonscanLink(props: { transactionId: string }) {
  const url = `https://polygonscan.com/tx/${props.transactionId}`;
  return (
    <Link href={url} className={styles.polyscanLink}>
      <span>Polygonscan</span>
      <ArrowForward fontSize="medium" />
    </Link>
  );
}
