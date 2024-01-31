import { useGetUsersWalletorhandle } from ".generated/carbonmark-api-sdk/hooks";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { addProjectsToAssets, AssetWithProject } from "lib/actions";
import { notNil } from "lib/utils/functional.utils";
import { isListableToken } from "lib/utils/listings.utils";
import { FC, useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import * as styles from "./styles";

export type Props = {
  address: string;
};

export const RetireFromPortfolio: FC<Props> = (props) => {
  const { networkLabel } = useWeb3();
  const { data: carbonmarkUser } = useGetUsersWalletorhandle(
    props.address,
    {},
    { shouldFetch: notNil(props.address) }
  );

  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetWithProject[] | null>(null);

  const listableAssets = carbonmarkUser?.assets?.filter(isListableToken) || [];

  useEffect(() => {
    if (!listableAssets.length) return;
    const getAssetsData = async () => {
      try {
        setIsLoadingAssets(true);
        const assetsWithProject = await addProjectsToAssets({
          assets: listableAssets,
          network: networkLabel,
        });
        setAssetsData(assetsWithProject);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingAssets(false);
      }
    };

    getAssetsData();
  }, [carbonmarkUser]);

  return (
    <>
      {isLoadingAssets && <SpinnerWithLabel label={t`Loading your assets`} />}

      {!!assetsData && (
        <div className={styles.cardsList}>
          {assetsData.map((a) => (
            <AssetProject asset={a} key={a.id} />
          ))}
        </div>
      )}

      {!assetsData?.length && (
        <Text className={styles.emptyText}>
          <i>
            <Trans>We couldn't find any assets in your portfolio.</Trans>
          </i>
        </Text>
      )}
    </>
  );
};
