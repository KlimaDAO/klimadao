import { Spinner, Text } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";

import { useEffect, useState } from "react";
import * as styles from "./styles";

export const Portfolio: NextPage = () => {
  const router = useRouter();
  const { isConnected, address } = useWeb3();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    !isLoading && !isConnected && router.push(`/marketplace/users/login`);
  }, [isLoading, isConnected]);

  return (
    <>
      <PageHead
        title="KlimaDao - Marketplace Portfolio"
        mediaTitle="KlimaDao - Marketplace Portfolio"
        metaDescription="KlimaDao - Marketplace Portfolio"
      />

      <MarketplaceLayout>
        {!isLoading && isConnected && (
          <div className={styles.fullWidth}>
            <Text t="h3">Portfolio</Text>
            <Text t="caption">For: {address}</Text>
            <Text t="caption">List ... </Text>
          </div>
        )}

        {isLoading ||
          (!isConnected && (
            <div className={styles.fullWidth}>
              <Spinner />
            </div>
          ))}
      </MarketplaceLayout>
    </>
  );
};
