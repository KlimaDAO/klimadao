import { Activities } from "components/Activities";
import { Stats } from "components/Stats";
import { getActiveListings, getAllListings } from "lib/listingsGetter";
import { User } from "lib/types/carbonmark.types";
import { FC } from "react";

type Props = {
  user?: User | null;
  isPending?: boolean;
  title: string;
};

export const ProfileSidebar: FC<Props> = (props) => {
  const allListings = props.user && getAllListings(props.user.listings || []);
  const activeListings =
    props.user && getActiveListings(props.user.listings || []);

  return (
    <>
      <Stats
        allListings={allListings || []}
        activeListings={activeListings || []}
        description={props.title}
      />
      <Activities
        activities={props.user?.activities || []}
        isLoading={props.isPending}
      />
    </>
  );
};
