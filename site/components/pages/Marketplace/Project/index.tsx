import { ButtonPrimary, ConnectModal, Text } from "@klimadao/lib/components";
import { Project } from "@klimadao/lib/types/marketplace";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { PageHead } from "components/PageHead";
import {
  createProjectLink,
  createProjectPurchaseLink,
  createSellerLink,
} from "components/pages/Marketplace/lib/createUrls";
import {
  formatBigToPrice,
  formatBigToTonnes,
  formatToPrice,
} from "components/pages/Marketplace/lib/formatNumbers";
import {
  getActiveListings,
  getLowestPriceFromListings,
} from "components/pages/Marketplace/lib/listingsGetter";
import { Activities } from "components/pages/Marketplace/shared/Activities";
import { Card } from "components/pages/Marketplace/shared/Card";
import { Category } from "components/pages/Marketplace/shared/Category";
import { ProjectImage } from "components/pages/Marketplace/shared/ProjectImage";
import { Stats } from "components/pages/Marketplace/shared/Stats";
import {
  Col,
  TwoColLayout,
} from "components/pages/Marketplace/shared/TwoColLayout";
import { Vintage } from "components/pages/Marketplace/shared/Vintage";
import { NextPage } from "next";
import Link from "next/link";
import { MarketplaceLayout } from "../Layout";

import * as styles from "./styles";

type Props = {
  project: Project;
};

export const MarketPlaceProject: NextPage<Props> = (props) => {
  const activeListings =
    !!props.project.listings?.length &&
    getActiveListings(props.project.listings);

  const { address } = useWeb3();

  return (
    <>
      <PageHead
        title={`KlimaDao - Marketplace Project: ${props.project.name}`}
        mediaTitle={`KlimaDao - Marketplace Project: ${props.project.name}`}
        metaDescription={`KlimaDao - Marketplace Project: ${props.project.name}`}
      />

      <MarketplaceLayout>
        <div className={styles.fullWidth}>
          <Link
            href={createProjectLink(props.project)}
            className={styles.backToResults}
          >
            <ArrowBack className="arrow" />
            <Trans id="marketplace.project.single.button.back_to_results">
              Back to Results
            </Trans>
          </Link>
        </div>

        <div className={styles.fullWidth}>
          <div className={styles.projectHeader}>
            <ProjectImage category={props.project.category.id} />
            <div className={styles.imageGradient}></div>
            <div className="stack">
              <Text t="h4" align="center" className={styles.projectHeaderText}>
                {props.project.name}
              </Text>
            </div>
            <div className={styles.tags}>
              <Text t="badge" className={styles.projectHeaderText}>
                {props.project.key}
              </Text>
              <Vintage vintage={props.project.vintage} />
              <Category category={props.project.category.id} />
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <div className="best-price">
            {activeListings && (
              <>
                <Text t="h5" color="lighter">
                  <span className="badge">
                    {formatToPrice(getLowestPriceFromListings(activeListings))}
                  </span>
                </Text>
                <Text t="h5" color="lighter">
                  <Trans id="marketplace.project.single.best_price">
                    Best Price
                  </Trans>
                </Text>
              </>
            )}
          </div>
          <div className="methodology">
            <Text t="caption" color="lighter">
              <Trans id="marketplace.project.single.methodology">
                Methodology:
              </Trans>
            </Text>
            <Text t="caption" color="lighter" align="end">
              {props.project.registry}
            </Text>
          </div>
        </div>

        <div className={styles.fullWidth}>
          <Text t="h5">Listings</Text>
          {!!activeListings && (
            <Text t="caption">
              We found <strong>{activeListings.length}</strong> prices for this
              project:
            </Text>
          )}
        </div>

        <TwoColLayout>
          <Col>
            <div className={styles.listings}>
              {!!activeListings &&
                activeListings.length &&
                activeListings.map((listing) => (
                  <Card key={listing.id}>
                    <Text t="caption">
                      Price: {formatBigToPrice(listing.singleUnitPrice)}
                    </Text>
                    <Text t="caption">
                      Available: {formatBigToTonnes(listing.leftToSell)}
                    </Text>
                    <Text t="caption">
                      Seller:{" "}
                      <Link href={createSellerLink(listing.seller.handle)}>
                        {listing.seller.handle}
                      </Link>
                    </Text>
                    {address ? (
                      <ButtonPrimary
                        label="Buy"
                        className={styles.buyButton}
                        href={createProjectPurchaseLink(
                          props.project,
                          listing.id
                        )}
                      />
                    ) : (
                      <ConnectModal
                        errorMessage={t({
                          message:
                            "We had some trouble connecting. Please try again.",
                          id: "connect_modal.error_message",
                        })}
                        torusText={t({
                          message: "or continue with",
                          id: "connectModal.continue",
                        })}
                        titles={{
                          connect: t({
                            id: "connect_modal.sign_in",
                            message: "Sign In / Connect",
                          }),
                          loading: t({
                            id: "connect_modal.connecting",
                            message: "Connecting...",
                          }),
                          error: t({
                            id: "connect_modal.error_title",
                            message: "Connection Error",
                          }),
                        }}
                        buttonText={t({
                          id: "marketplace.project.single.connect_to_buy",
                          message: "Sign In / Connect To Buy",
                        })}
                      />
                    )}
                  </Card>
                ))}
            </div>
          </Col>
          <Col>
            <Stats description="Data for this project and vintage" />
            <Activities activities={props.project.activities} />
          </Col>
        </TwoColLayout>
      </MarketplaceLayout>
    </>
  );
};
