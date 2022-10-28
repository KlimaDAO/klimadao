import { NextPage } from "next";
import { Text } from "@klimadao/lib/components";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";

import * as styles from "./styles";

type Props = {
  userAddress: string;
  userDomain: string | null;
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
          <Text>LISTING</Text>
        </div>
      </MarketplaceLayout>
    </>
  );
};
