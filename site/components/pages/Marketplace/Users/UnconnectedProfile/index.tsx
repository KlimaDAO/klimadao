import React, { FC } from "react";
import { User } from "@klimadao/lib/types/marketplace";
import { Activities } from "../Activities";
import { Stats } from "../Stats";
import { ProfileHeader } from "../ProfileHeader";
import {
  TwoColLayout,
  Col,
} from "components/pages/Marketplace/shared/TwoColLayout";

import * as styles from "./styles";

type Props = {
  marketplaceUser: User | null;
  userName: string;
};

export const UnconnectedProfile: FC<Props> = (props) => {
  const userData = props.marketplaceUser;

  return (
    <>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={props.userName}
          isMarketplaceUser={!!userData}
          description={userData?.description}
        />
      </div>
      <TwoColLayout>
        <Col>Listings</Col>
        <Col>
          <Stats
            stats={{
              tonnesSold: 0,
              tonnesOwned: 0,
              activeListings:
                userData?.listings?.filter((l) => l.active).length || 0,
            }}
          />
          <Activities activities={userData?.activities || []} />
        </Col>
      </TwoColLayout>
    </>
  );
};
