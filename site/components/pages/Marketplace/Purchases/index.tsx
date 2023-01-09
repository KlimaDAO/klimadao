import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { MarketplaceLayout } from "components/pages/Marketplace/Layout";
import { Card } from "components/pages/Marketplace/shared/Card";
import { MarketplaceButton } from "components/pages/Marketplace/shared/MarketplaceButton";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Purchase } from "@klimadao/lib/types/marketplace";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { PageHead } from "components/PageHead";
import { createProjectLink } from "components/pages/Marketplace/lib/createUrls";

import {
  formatBigToPrice,
  formatBigToTonnes,
} from "components/pages/Marketplace/lib/formatNumbers";

import * as styles from "./styles";

type Props = {
  purchase: Purchase | null;
  transaction: string;
};

export const MarketPlacePurchaseReceipt: NextPage<Props> = (props) => {
  const { locale } = useRouter();

  const projectName = props.purchase?.listing?.project?.name || "Loading";

  return (
    <>
      <PageHead
        title={`KlimaDao - Successfully Purchased Marketplace Project: ${projectName}`}
        mediaTitle={`KlimaDao - Successfully Purchased Marketplace Project: ${projectName}`}
        metaDescription={`KlimaDao - Successfully Purchased Marketplace Project: ${projectName}`}
      />

      <MarketplaceLayout>
        {!!props.purchase && (
          <div className={styles.fullWidth}>
            <Link
              href={createProjectLink(props.purchase.listing.project)}
              className={styles.backToResults}
            >
              <ArrowBack className="arrow" />
              <Trans id="marketplace.project.single.button.back_to_project_details">
                Back to Project Details
              </Trans>
            </Link>
          </div>
        )}

        <div className={styles.fullWidth}>
          <div className={styles.receiptContainer}>
            <Card>
              <div className={styles.receiptContent}>
                <Text t="h3" className="headline">
                  <CelebrationOutlinedIcon fontSize="inherit" />
                  <Trans>Payment Successful</Trans>
                </Text>
                <Text>
                  {!props.purchase && (
                    <Trans>
                      We are still processing your successful purchase. Please
                      visit this page again in a few minutes to see your
                      receipt.
                    </Trans>
                  )}
                  {!!props.purchase && (
                    <Trans>
                      Thank you for supporting the planet! See purchase details
                      below.
                    </Trans>
                  )}
                </Text>
                <Text>
                  View transaction on{" "}
                  <a
                    href={`https://mumbai.polygonscan.com/tx/${props.transaction}`} // TODO: switch link to mainnet
                    target="_blank"
                    rel="noreferrer"
                  >
                    polygonscan
                  </a>
                  .
                </Text>

                {!!props.purchase && (
                  <>
                    <div className="summary">
                      <div className="cols">
                        <div className="col">
                          <Text t="caption">
                            <Trans>Quantity purchased:</Trans>
                          </Text>
                          <Text t="caption">
                            {formatBigToTonnes(props.purchase.amount, locale)}
                          </Text>
                        </div>

                        <div className="col">
                          <Text t="caption">
                            <Trans>Final price</Trans>
                          </Text>
                          <Text t="caption">
                            {formatBigToPrice(props.purchase.price, locale)}
                          </Text>
                        </div>
                      </div>

                      <Text t="caption">
                        <Trans>Project</Trans>
                      </Text>
                      <Text t="caption" color="lighter">
                        {props.purchase.listing.project.methodology}
                      </Text>
                      <Text t="caption">
                        {props.purchase.listing.project.name}
                      </Text>
                      <Text t="badge" className="country">
                        {props.purchase.listing.project.country.id}
                      </Text>
                    </div>

                    <ButtonPrimary
                      label={
                        <Trans id="marketplace.purchase.button.go_to_infinity">
                          Use Klima Infinity to retire & offset
                        </Trans>
                      }
                    />
                    <MarketplaceButton
                      label={
                        <Trans id="marketplace.purchase.button.view_assets">
                          View Assets
                        </Trans>
                      }
                    />
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </MarketplaceLayout>
    </>
  );
};
