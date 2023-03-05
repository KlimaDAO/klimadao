import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { Vintage } from "components/Vintage";
import { formatToPrice } from "lib/formatNumbers";
import {
  getActiveListings,
  getAllListings,
  getLowestPriceFromBuyOptions,
  sortPricesAndListingsByBestPrice,
} from "lib/listingsGetter";
import {
  PriceFlagged,
  Project as ProjectType,
  ProjectBuyOption,
} from "lib/types/carbonmark";
import { NextPage } from "next";
import { PoolPrice } from "./BuyOptions/PoolPrice";
import { SellerListing } from "./BuyOptions/SellerListing";
import { ProjectMap } from "./ProjectMap";
import * as styles from "./styles";

type Props = {
  project: ProjectType;
};

const isPoolPrice = (option: ProjectBuyOption): option is PriceFlagged =>
  (option as PriceFlagged).isPoolProject !== undefined;

export const Project: NextPage<Props> = (props) => {
  const allListings =
    Array.isArray(props.project.listings) &&
    getAllListings(props.project.listings);
  const activeListings =
    (Array.isArray(props.project.listings) &&
      getActiveListings(props.project.listings)) ||
    [];
  const poolPrices =
    (Array.isArray(props.project?.prices) && props.project.prices) || [];

  const sortedListingsAndPrices = sortPricesAndListingsByBestPrice(
    poolPrices,
    activeListings
  );

  const bestPrice =
    !!sortedListingsAndPrices.length &&
    getLowestPriceFromBuyOptions(sortedListingsAndPrices);

  const pricesOrListings =
    !!sortedListingsAndPrices.length &&
    sortedListingsAndPrices.map((option) => {
      if (isPoolPrice(option)) {
        return (
          <PoolPrice
            key={option.tokenAddress}
            price={option}
            project={props.project}
            isBestPrice={bestPrice === option.singleUnitPrice}
          />
        );
      }

      return (
        <SellerListing
          key={option.tokenAddress}
          project={props.project}
          listing={option}
          isBestPrice={bestPrice === option.singleUnitPrice}
        />
      );
    });
  return (
    <>
      <PageHead
        title={t`${props.project.projectID} | Carbonmark`}
        mediaTitle={t`${props.project.name} | Carbonmark`}
        metaDescription={`${props.project.description}`}
      />

      <Layout>
        <div className={styles.fullWidth}>
          <div className={styles.projectHeader}>
            {!!props.project.category?.id && (
              <ProjectImage category={props.project.category.id} />
            )}
            <div className={styles.imageGradient}></div>
            <div className="stack">
              <Text t="h3" align="center" className={styles.projectHeaderText}>
                {props.project.name || "! MISSING PROJECT NAME !"}
              </Text>
            </div>
            <div className={styles.tags}>
              <Text t="h4" className={styles.projectHeaderText}>
                {props.project.key}
              </Text>
              <Vintage vintage={props.project.vintage} />
              {!!props.project.category?.id && (
                <Category category={props.project.category.id} />
              )}
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          {bestPrice && (
            <div className="best-price">
              <Text t="h4">
                <span className="badge">{formatToPrice(bestPrice)}</span>
              </Text>
              <Text t="h4" color="lighter">
                <Trans id="project.single.best_price">Best Price</Trans>
              </Text>
            </div>
          )}

          <div className="methodology">
            <Text t="h5" color="lighter">
              <Trans id="project.single.methodology">Methodology:</Trans>
            </Text>
            <Text t="body1" color="lighter" align="end">
              {props.project.registry}
            </Text>
          </div>
        </div>
        <div
          className={cx(
            {
              hasMap: !!props.project.location,
            },
            styles.row
          )}
        >
          {props.project.location && (
            <div className={styles.mapContainer}>
              <ProjectMap
                lat={props.project.location?.geometry.coordinates[1]}
                lng={props.project.location?.geometry.coordinates[0]}
                zoom={5}
              />
            </div>
          )}
          <div className={styles.descriptionContainer}>
            <Text t="h5" color="lighter">
              <Trans>Description</Trans>
            </Text>
            <Text t="body1">
              {props.project.description ?? "No project description found"}
            </Text>
          </div>
        </div>

        <div className={styles.listingsHeader}>
          <Text t="h4">Listings</Text>
          {sortedListingsAndPrices ? (
            <Text t="body1">
              We found <strong>{sortedListingsAndPrices.length}</strong> prices
              for this project:
            </Text>
          ) : (
            <Text t="body1" color="default">
              <i>
                <Trans>No listings found for this project.</Trans>
              </i>
            </Text>
          )}
        </div>

        <TwoColLayout>
          <Col>
            <div className={styles.listings}>{pricesOrListings || null}</div>
          </Col>
          <Col>
            <Stats
              description={t`Data for this project and vintage`}
              currentSupply={props.project.currentSupply}
              totalRetired={props.project.totalRetired}
              allListings={allListings || []}
              activeListings={activeListings || []}
            />
            <Activities activities={props.project.activities || []} />
          </Col>
        </TwoColLayout>
      </Layout>
    </>
  );
};
