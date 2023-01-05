import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { MarketplaceButton } from "components/pages/Marketplace/shared/MarketplaceButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { MarketplaceLayout } from "components/pages/Marketplace/Layout";
import { Card } from "components/pages/Marketplace/shared/Card";

import { PageHead } from "components/PageHead";
import { createProjectLink } from "components/pages/Marketplace/lib/createUrls";
import { Purchase } from "@klimadao/lib/types/marketplace";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";

import {
  formatBigToPrice,
  formatTonnes,
} from "components/pages/Marketplace/lib/formatNumbers";

import * as styles from "./styles";

type Props = {
  purchase: Purchase;
};

export const MarketPlacePurchaseReceipt: NextPage<Props> = (props) => {
  const { locale } = useRouter();

  console.log("project", props.purchase.listing.project);
  return (
    <>
      <PageHead
        title={`KlimaDao - Successfully Purchased Marketplace Project: ${props.purchase.listing.project.name}`}
        mediaTitle={`KlimaDao - Successfully Purchased Marketplace Project: ${props.purchase.listing.project.name}`}
        metaDescription={`KlimaDao - Successfully Purchased Marketplace Project: ${props.purchase.listing.project.name}`}
      />

      <MarketplaceLayout>
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

        <div className={styles.fullWidth}>
          <div className={styles.receiptContainer}>
            <Card>
              <div className={styles.receiptContent}>
                <Text t="h3" className="headline">
                  <CelebrationOutlinedIcon fontSize="inherit" />
                  <Trans>Payment Successful</Trans>
                </Text>
                <Text>
                  <Trans>
                    Thank you for supporting the planet! See purchase details
                    below.
                  </Trans>
                </Text>
                <Text>
                  View transaction on{" "}
                  <a
                    href={`https://mumbai.polygonscan.com/tx/${props.purchase.id}`} // TODO: switch link to mainnet
                    target="_blank"
                    rel="noreferrer"
                  >
                    polygonscan
                  </a>
                  .
                </Text>

                <div className="summary">
                  <div className="cols">
                    <div className="col">
                      <Text t="caption">
                        <Trans>Quantity purchased:</Trans>
                      </Text>
                      <Text t="caption">
                        {formatTonnes(props.purchase.amount, locale)}
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
                  <Text t="caption">{props.purchase.listing.project.name}</Text>
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
              </div>
            </Card>
          </div>
        </div>
      </MarketplaceLayout>
    </>
  );
};
