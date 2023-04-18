import { t } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Stats } from "components/Stats";
import { getActiveListings, getAllListings } from "lib/listingsGetter";
import { User } from "lib/types/carbonmark";
import { FC } from "react";
import { Balances } from "./Balances";

type Props = {
  user: User | null;
};

export const PortfolioSidebar: FC<Props> = (props) => {
  const allListings = props.user && getAllListings(props.user.listings);
  const activeListings = props.user && getActiveListings(props.user.listings);

  return (
    <>
      <Balances />
      <Stats
        allListings={allListings || []}
        activeListings={activeListings || []}
        description={t`Your seller data`}
      />
      <Activities activities={props.user?.activities || []} />
    </>
  );
};
