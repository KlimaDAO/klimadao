import { NextPage } from "next";
import { Text } from "@klimadao/lib/components";
import { useIsMarketplaceProfile } from "hooks/useIsMarketplaceProfile";

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
  const { isConnectedProfile, isUnconnectedProfile } = useIsMarketplaceProfile(
    props.userAddress
  );

  const userName = props.userDomain || props.userAddress;
  return (
    <>
      <PageHead
        title={`KlimaDao - Marketplace Profile for ${userName}`}
        mediaTitle={`KlimaDao - Marketplace Profile for ${userName}`}
        metaDescription={`KlimaDao - Marketplace Profile for ${userName}`}
      />

      <MarketplaceLayout
        userAddress={props.userAddress}
        userDomain={props.userDomain}
        profileButton={
          isConnectedProfile ? (
            <ButtonPrimary
              label={t({
                id: "marketplace.edit_profile",
                message: "Edit Profile",
              })}
              onClick={() => setShowModal(true)}
            />
          ) : undefined
        }
      >
        <div className={styles.fullWidth}>
          <Text t="h1">User</Text>
          <Text>User: {userName}</Text>
          {!props.marketplaceUser && isUnconnectedProfile && (
            <Text>
              Sorry, we couldn't find any marketplace data for this user.
            </Text>
          )}
          {!props.marketplaceUser && isConnectedProfile && (
            <Text>Edit your profile</Text>
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
