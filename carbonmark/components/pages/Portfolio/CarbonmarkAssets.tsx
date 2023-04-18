import { Trans } from "@lingui/macro";
import { CreateListing } from "components/CreateListing";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { addProjectsToAssets } from "lib/actions";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import { AssetForListing, User } from "lib/types/carbonmark";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import * as styles from "./styles";

type Props = {
  address: string;
  user: User | null;
  isLoadingUser: boolean;
};

export const CarbonmarkAssets: FC<Props> = (props) => {
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);
  const [assetToSell, setAssetToSell] = useState<AssetForListing | null>(null);

  const assetWithProjectTokens =
    !!props.user?.assets?.length &&
    getAssetsWithProjectTokens(props.user.assets);

  const hasAssets = !isLoadingAssets && !!assetWithProjectTokens;

  // load Assets every time user changed
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
  }, [props.user]);

  const onUpdateUser = () => {
    console.log("UPDATE");
  };

  return (
    <>
      {props.isLoadingUser && <SpinnerWithLabel />}

      <div className={props.isLoadingUser ? styles.loadingOverlay : ""}>
        {!!assetsData &&
          assetsData.map((a) => (
            <AssetProject
              key={a.tokenAddress}
              asset={a}
              onSell={() => setAssetToSell(a)}
            />
          ))}

        {!!assetToSell && (
          <CreateListing
            onModalClose={() => setAssetToSell(null)}
            onSubmit={onUpdateUser}
            assets={[assetToSell]}
            showModal={!!assetToSell}
            successScreen={
              <Text>
                <Trans>
                  Success. Go to your{" "}
                  <Link href={`/users/${props.address}`}>Profile page</Link> to
                  see your new listing.
                </Trans>
              </Text>
            }
          />
        )}
      </div>
    </>
  );
};
