import { useGetUsersWalletorhandle } from ".generated/carbonmark-api-sdk/hooks";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { addProjectsToAssets } from "lib/actions";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import { AssetForListing } from "lib/types/carbonmark.types";
import { FC, useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import * as styles from "./styles";

export type Props = {
  address: string;
};

export const RetireFromPortfolio: FC<Props> = (props) => {
  const { data: carbonmarkUser, isLoading } = useGetUsersWalletorhandle(props.address);

  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);

  const assetWithProjectTokens =
    !!carbonmarkUser?.assets?.length &&
    getAssetsWithProjectTokens(carbonmarkUser.assets);

  const emptyAssets =
    !!carbonmarkUser && !isLoadingAssets && !assetsData?.length;
  const hasAssets =
    !!carbonmarkUser && !isLoadingAssets && !!assetWithProjectTokens;
  const isUnregistered = props.address && !isLoading && carbonmarkUser === null;

  // load Assets on carbonmarkUser
  useEffect(() => {
    if (hasAssets) {
      const getAssetsData = async () => {
        try {
          setIsLoadingAssets(true);

          if (assetWithProjectTokens) {
            const assetsWithProject = await addProjectsToAssets({
              assets: assetWithProjectTokens,
            });

            // TODO: filter assets with balance > 0
            // this will be unnecessary as soon as bezos switched to mainnet
            const assetsWithBalance = assetsWithProject.filter(
              (a) => Number(a.balance) > 0
            );

            setAssetsData(assetsWithBalance);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoadingAssets(false);
        }
      };

      getAssetsData();
    }
  }, [carbonmarkUser]);

  return (
    <>
      {isLoadingAssets && <SpinnerWithLabel label={t`Loading your assets`} />}

      {!!assetsData && (
        <div className={styles.cardsList}>
          {assetsData.map((a) => (
            <AssetProject asset={a} key={a.tokenAddress} />
          ))}
        </div>
      )}

      {emptyAssets && (
        <>
          <Text>
            <i>
              <Trans>We couldn't find any assets in your portfolio.</Trans>
            </i>
          </Text>
          <ButtonPrimary
            href={"/projects"}
            label={t`Purchase Carbon`}
            className={styles.buttonEmptyState}
          />
        </>
      )}

      {isUnregistered && (
        <>
          <Text>
            <i>
              <Trans>We couldn't find any assets in your portfolio.</Trans>
            </i>
          </Text>
          <ButtonPrimary
            href={"/users/login"}
            label={t`Create Carbonmark Profile`}
            className={styles.buttonEmptyState}
          />
        </>
      )}
    </>
  );
};
