import { t } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Stats } from "components/Stats";
import { getActiveListings, getAllListings } from "lib/listingsGetter";
import { User } from "lib/types/carbonmark.types";
import { FC } from "react";
import { Balances } from "./Balances";
import { ConnectedWallet } from "./ConnectedWallet";
import * as styles from "./styles";

type Props = {
  user?: User | null;
  isPending: boolean;
  address: string | undefined;
};

export const PortfolioSidebar: FC<Props> = (props) => {
  const allListings = props.user && getAllListings(props.user.listings || []);
  const activeListings =
    props.user && getActiveListings(props.user.listings || []);

  return (
    <div className={styles.stickyContentWrapper}>
      {props.address && <ConnectedWallet address={props.address} />}
      <Balances />
      <Stats
        allListings={allListings || []}
        activeListings={activeListings || []}
        description={t`Your seller data`}
      />
      <Activities
        activities={props.user?.activities || []}
        isLoading={props.isPending}
      />
    </div>
  );
};
