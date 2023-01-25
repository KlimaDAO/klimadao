import * as styles from "./styles";

import { CarbonTonnesBreakdownCard } from "components/CarbonTonnesBreakdownCard";
import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";

type Props = {
  children: React.ReactNode;
};

export const OffsetLayout: React.FC<Props> = (props) => (
  <>
    <div className={styles.columnRight}>
      <CarbonTonnesRetiredCard />
      <CarbonTonnesBreakdownCard />
    </div>

    <div className={styles.offsetCard}>{props.children}</div>
  </>
);
