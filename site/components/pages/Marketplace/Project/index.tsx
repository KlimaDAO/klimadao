import { Text } from "@klimadao/lib/components";
import { Project } from "@klimadao/lib/types/marketplace";
import { Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { PageHead } from "components/PageHead";
import { formatToPrice } from "components/pages/Marketplace/lib/formatNumbers";
import {
  getActiveListings,
  getAllListings,
  getAmountLeftToSell,
  getLowestPriceFromListings,
  getTotalAmountSold,
} from "components/pages/Marketplace/lib/listingsGetter";
import { Activities } from "components/pages/Marketplace/shared/Activities";
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
import { ProjectListing } from "./ProjectListing";

import * as styles from "./styles";

type Props = {
  project: Project;
};

export const MarketPlaceProject: NextPage<Props> = (props) => {
  const hasListings = !!props.project.listings?.length;
  const allListings = hasListings && getAllListings(props.project.listings);
  const activeListings =
    hasListings && getActiveListings(props.project.listings);

  return (
    <>
      <PageHead
        title={`KlimaDao - Marketplace Project: ${props.project.name}`}
        mediaTitle={`KlimaDao - Marketplace Project: ${props.project.name}`}
        metaDescription={`KlimaDao - Marketplace Project: ${props.project.name}`}
      />

      <MarketplaceLayout>
        <div className={styles.fullWidth}>
          <Link href={"/marketplace/projects"} className={styles.backToResults}>
            <ArrowBack className="arrow" />
            <Trans id="marketplace.project.single.button.back_to_projects">
              Back to Projects
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

        <div className={styles.listingsHeader}>
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
                  <ProjectListing
                    key={listing.id}
                    listing={listing}
                    project={props.project}
                  />
                ))}
            </div>
          </Col>
          <Col>
            <Stats
              description="Data for this project and vintage"
              stats={{
                tonnesSold:
                  (!!allListings && getTotalAmountSold(allListings)) || 0,
                tonnesOwned:
                  (!!activeListings && getAmountLeftToSell(activeListings)) ||
                  0,
                activeListings:
                  (!!activeListings && activeListings.length) || 0,
              }}
            />
            <Activities activities={props.project.activities} />
          </Col>
        </TwoColLayout>
      </MarketplaceLayout>
    </>
  );
};
