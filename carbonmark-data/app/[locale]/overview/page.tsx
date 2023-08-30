import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/VerraCreditsCard";
import * as chartStyles from "components/charts/styles";
import * as styles from "./styles";

/** Overview page (index/landing page) captured via rewrite in next.config.js*/
export default function OverviewPage() {
  return (
    <div>
      <h1>{t`State of the digital carbon market`}</h1>
      <div className={styles.global}>
        <div className={styles.mainColumn}>
          <div className={chartStyles.chartRow}>
            <VerraCreditsCard></VerraCreditsCard>
          </div>
        </div>
      </div>
    </div>
  );
}
