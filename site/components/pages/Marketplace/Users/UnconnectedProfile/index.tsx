import React, { FC } from "react";

import { Text } from "@klimadao/lib/components";

import { User } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  marketplaceUser: User | null;
};

export const UnconnectedProfile: FC<Props> = (props) => {
  const userData = props.marketplaceUser;

  return (
    <div className={styles.fullWidth}>
      {!userData && (
        <Text>Sorry, we couldn't find any marketplace data for this user.</Text>
      )}
      {userData && (
        <>
          <Text>Handle: {userData.handle}</Text>
          <Text>Username: {userData.username}</Text>
          <Text>Description: {userData.description}</Text>
          <Text>Wallet: {userData.wallet}</Text>
          <Text>Listing: {userData.listings?.length || 0}</Text>
          <Text>Activities: {userData.activities?.length || 0}</Text>
        </>
      )}
    </div>
  );
};
