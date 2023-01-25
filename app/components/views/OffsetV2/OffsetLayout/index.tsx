import { Anchor as A, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import ParkOutlined from "@mui/icons-material/ParkOutlined";

import { CarbonTonnesBreakdownCard } from "components/CarbonTonnesBreakdownCard";
import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";

import * as styles from "./styles";

type Props = {
  children: React.ReactNode;
};

export const OffsetLayout: React.FC<Props> = (props) => (
  <>
    <div className={styles.columnRight}>
      <CarbonTonnesRetiredCard />
      <CarbonTonnesBreakdownCard />
    </div>

    <div className={styles.offsetCard}>
      <div className={styles.offsetCard_header}>
        <Text t="h4" className={styles.offsetCard_header_title}>
          <ParkOutlined />
          <Trans id="offset.retire_carbon">Retire Carbon</Trans>
        </Text>
        <Text t="caption" color="lightest">
          <Trans id="offset.go_carbon_neutral">
            Go carbon neutral by retiring carbon and claiming the underlying
            environmental benefit of the carbon offset. Learn more about carbon
            tokens in our <A href={urls.officialDocs}>docs</A>.
          </Trans>
        </Text>
        <Text t="caption" color="lightest">
          <FiberNewRoundedIcon className={styles.newReleasesIcon} />
          <Trans id="offset.lifi">
            Cross-chain offsetting is now available through{" "}
            <A href={urls.lifiOffset}>LI.FI and Etherspot</A>, with support for
            multiple chains and tokens.
          </Trans>
        </Text>
      </div>

      {props.children}
    </div>
  </>
);
