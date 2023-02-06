import { Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Layout } from "components/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Purchase } from "@klimadao/lib/types/carbonmark";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { PageHead } from "components/shared/PageHead";
import { createProjectLink } from "lib/createUrls";

import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";

import * as styles from "./styles";

type Props = {
  purchase: Purchase | null;
  transaction: string;
};

export const PurchaseReceipt: NextPage<Props> = (props) => {
  const { locale } = useRouter();
  const amount =
    props.purchase?.amount && formatBigToTonnes(props.purchase.amount, locale);
  const metaDescription = props.purchase
    ? t`${amount} tonnes were purchased for project ${props.purchase.listing.project.projectID}`
    : t`View the project details and other info for this purchase.`;

  return (
    <>
      <PageHead
        doNotIndex
        title={t`Purchase Receipt | Carbonmark`}
        mediaTitle={t`Purchase Receipt | Carbonmark`}
        metaDescription={metaDescription}
      />

      <Layout>
        {!!props.purchase && (
          <div className={styles.fullWidth}>
            <Link
              href={createProjectLink(props.purchase.listing.project)}
              className={styles.backToResults}
            >
              <ArrowBack className="arrow" />
              <Trans id="project.single.button.back_to_project_details">
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
                    <CarbonmarkButton
                      href="/portfolio"
                      label={
                        <Trans id="purchase.button.view_assets">
                          View Your Assets
                        </Trans>
                      }
                    />
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};
