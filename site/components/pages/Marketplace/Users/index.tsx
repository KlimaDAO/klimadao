import { NextPage } from "next";
import { Text } from "@klimadao/lib/components";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";
import { User } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  userAddress: string;
  userDomain: string | null;
  marketplaceUser: User | null;
};

export const Users: NextPage<Props> = (props) => {
  return (
    <>
      <PageHead
        title="KlimaDao - Marketplace Profile"
        mediaTitle="KlimaDao - Marketplace Profile"
        metaDescription="KlimaDao - Marketplace Profile"
      />

      <MarketplaceLayout userDomain={props.userDomain}>
        <div className={styles.fullWidth}>
          <Text t="h1">User</Text>
          <Text>User: {props.userDomain || props.userAddress}</Text>
          {!props.marketplaceUser && (
            <Text>
              Sorry, we couldn't find any marketplace data for this user.
            </Text>
          )}
          {props.marketplaceUser && (
            <>
              <Text>Handle: {props.marketplaceUser.handle}</Text>
              <Text>Username: {props.marketplaceUser.username}</Text>
              <Text>Description: {props.marketplaceUser.description}</Text>
              <Text>Wallet: {props.marketplaceUser.wallet}</Text>
              <Text>Listing: {props.marketplaceUser.listings.length}</Text>
              <Text>Activities: {props.marketplaceUser.activities.length}</Text>
            </>
          )}
        </div>
      </MarketplaceLayout>
    </>
  );
};
