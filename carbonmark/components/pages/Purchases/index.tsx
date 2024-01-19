import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { createProjectLink, getPolygonScanBaseUrl } from "lib/createUrls";
import { formatToPrice, formatToTonnes } from "lib/formatNumbers";
import { Purchase } from "lib/types/carbonmark.types";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import * as styles from "./styles";

export type PageProps = {
  purchase: Purchase | null;
  transaction: string;
};

export const PurchaseReceipt: NextPage<PageProps> = (props) => {
  const { locale } = useRouter();
  const { networkLabel } = useWeb3();
  const amount =
    props.purchase?.amount && formatToTonnes(props.purchase.amount, locale);
  const metaDescription = props.purchase
    ? t`${amount} tonnes were purchased for project ${props.purchase?.listing?.project?.key}`
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
        {!!props.purchase?.listing.project && (
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
                    href={`${getPolygonScanBaseUrl(networkLabel)}/tx/${
                      props.transaction
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    polygonscan
                  </a>
                  .
                </Text>
                <Text>
                  <Trans>
                    If you would like to retire some or all of the carbon
                    credits from this purchase, go to your{" "}
                    <Link href="/portfolio">portfolio</Link>, click the 'retire'
                    button and follow the directions.
                  </Trans>
                </Text>
                {!!props.purchase && !!props.purchase.listing.project && (
                  <>
                    <div className="summary">
                      <div className="cols">
                        <div className="col">
                          <Text t="body1">
                            <Trans>Quantity purchased:</Trans>
                          </Text>
                          <Text t="body1">
                            {formatToTonnes(props.purchase.amount, locale)}
                          </Text>
                        </div>

                        <div className="col">
                          <Text t="body1">
                            <Trans>Final price</Trans>
                          </Text>
                          <Text t="body1">
                            {formatToPrice(props.purchase.price, locale)}
                          </Text>
                        </div>
                      </div>
                      <Text>
                        {props.purchase.listing.project.key}-
                        {props.purchase.listing.project.vintage}
                      </Text>
                      <Text>
                        <Link
                          href={createProjectLink(
                            props.purchase.listing.project
                          )}
                          target="blank"
                        >
                          {props.purchase.listing.project.name}
                        </Link>
                      </Text>
                      <Text color="lighter">
                        {props.purchase.listing.project.methodology}
                      </Text>
                      <Text>{props.purchase.listing.project.country}</Text>
                    </div>
                    <CarbonmarkButton
                      href="/portfolio"
                      renderLink={(p) => <Link {...p} />}
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
