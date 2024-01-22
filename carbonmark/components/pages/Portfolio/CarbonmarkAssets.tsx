import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { CreateListing } from "components/CreateListing";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { addProjectsToAssets, AssetWithProject } from "lib/actions";
import { LO } from "lib/luckyOrange";
import { User } from "lib/types/carbonmark.types";
import { isListableToken } from "lib/utils/listings.utils";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import * as styles from "./styles";

type Props = {
  address: string;
  user: User | null;
  isLoadingUser: boolean;
  onUpdateUser: () => void;
};

export const CarbonmarkAssets: FC<Props> = (props) => {
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetWithProject[] | null>(null);
  const [assetToSell, setAssetToSell] = useState<AssetWithProject | null>(null);

  const listableAssets = props.user?.assets?.filter(isListableToken) || [];
  const isUpdatingUser = props.isLoadingUser || isLoadingAssets;
  const hasAssets = !isLoadingAssets && !!listableAssets.length;
  const emptyAssets = !isUpdatingUser && !assetsData?.length;
  const { networkLabel } = useWeb3();

  // load Assets every time user changed
  useEffect(() => {
    if (hasAssets) {
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
    }
  }, [props.user]);

  return (
    <>
      {isUpdatingUser && <SpinnerWithLabel label={t`Loading your assets`} />}

      {!!assetsData &&
        assetsData.map((a) => (
          <div
            className={isUpdatingUser ? styles.loadingOverlay : ""}
            key={a.id}
          >
            <AssetProject
              asset={a}
              listings={props.user?.listings || []}
              onSell={() => {
                LO.track("Listing: Sell Clicked");
                setAssetToSell(a);
              }}
            />
          </div>
        ))}

      {!!assetToSell && (
        <CreateListing
          onModalClose={() => setAssetToSell(null)}
          onSubmit={props.onUpdateUser}
          assets={[assetToSell]}
          showModal={!!assetToSell}
          listings={props.user?.listings || []}
          successScreen={
            <Text align="center">
              <Trans>
                Success! Your new listing will appear in a few moments on your{" "}
                <Link href={`/users/${props.address}`}>Profile page</Link>.
              </Trans>
            </Text>
          }
        />
      )}

      {emptyAssets && (
        <Text>
          <Trans>No listable assets found.</Trans>
        </Text>
      )}
    </>
  );
};
