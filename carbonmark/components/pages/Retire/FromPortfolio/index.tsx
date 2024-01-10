import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { useFetchUsersWalletOrHandle } from "hooks/useFetchUsersWalletOrHandle";
import { addProjectsToAssets, AssetWithProject } from "lib/actions";
import { isListableToken } from "lib/utils/listings.utils";
import { isNil } from "lodash";
import { FC, useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import * as styles from "./styles";

export type Props = {
  address: string;
};

export const RetireFromPortfolio: FC<Props> = (props) => {
  const { networkLabel } = useWeb3();
  const { data: carbonmarkUser, isLoading } = useFetchUsersWalletOrHandle(
    props.address,
    { network: networkLabel, expiresAfter: "0" },
    { shouldFetch: !!props.address }
  );

  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetWithProject[] | null>(null);

  const listableAssets = carbonmarkUser?.assets?.filter(isListableToken) || [];
  const emptyAssets =
    !!carbonmarkUser && !isLoadingAssets && !assetsData?.length;
  const hasAssets =
    !!carbonmarkUser && !isLoadingAssets && !!listableAssets.length;
  const isUnregistered = props.address && !isLoading && isNil(carbonmarkUser);

  useEffect(() => {
    if (!hasAssets) return;
    const getAssetsData = async () => {
      try {
        setIsLoadingAssets(true);

        if (listableAssets.length) {
          const assetsWithProject = await addProjectsToAssets({
            assets: listableAssets,
            network: networkLabel,
          });

          setAssetsData(assetsWithProject);
        }
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
