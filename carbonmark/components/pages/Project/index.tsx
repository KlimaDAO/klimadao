import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
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
    (Array.isArray(props.project?.prices) &&
      // Remove pool prices if the quantity is less than 1. (leftover  token 'dust')
      props.project.prices.filter((p) => Number(p.leftToSell) > 1)) ||
    [];

  const sortedListingsAndPrices = sortPricesAndListingsByBestPrice(
    poolPrices,
    activeListings
  );

  const bestPrice =
    !!sortedListingsAndPrices.length &&
    getLowestPriceFromBuyOptions(sortedListingsAndPrices);

  const pricesOrListings =
    !!sortedListingsAndPrices.length &&
    sortedListingsAndPrices.map((option, index) => {
      if (isPoolPrice(option)) {
        return (
          <PoolPrice
            key={option.singleUnitPrice + index}
            price={option}
            project={props.project}
            isBestPrice={bestPrice === option.singleUnitPrice}
          />
        );
      }

      return (
        <SellerListing
          key={option.singleUnitPrice + index}
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
        <div className={styles.projectControls}>
          <LoginButton className="desktopLogin" />
        </div>
        <div className={styles.projectHeader}>
          {!!props.project.category?.id && (
            <ProjectImage category={props.project.category.id} />
          )}
          <div className={styles.imageGradient} />
          <Text t="h4" className={styles.projectHeaderText}>
            {props.project.name || "Error - No project name found"}
          </Text>
          <div className={styles.tags}>
            <Text t="h5" className={styles.projectHeaderText}>
              {props.project.registry}-{props.project.projectID}
            </Text>
            <Vintage vintage={props.project.vintage} />
            {!!props.project.category?.id && (
              <Category category={props.project.category.id} />
            )}
          </div>
        </div>

        <div className={styles.meta}>
          <div className="best-price">
            {bestPrice && (
              <>
                <Text t="h5" className="best-price-badge">
                  {formatToPrice(bestPrice)}
                </Text>
                <Text t="h5" color="lighter">
                  <Trans>Best Price</Trans>
                </Text>
              </>
            )}
          </div>

          <div className="methodology">
            <Text t="h5" color="lighter">
              <Trans>Methodology</Trans>
            </Text>
            <Text t="body1" color="lighter" align="end">
              {props.project.registry}-{props.project.projectID}
            </Text>
          </div>
        </div>
        <div
          className={cx(styles.mapAndDescription, {
            hasMap: !!props.project.location,
          })}
        >
          {props.project.location && (
            <div className="mapColumn">
              <ProjectMap
                lat={props.project.location?.geometry.coordinates[1]}
                lng={props.project.location?.geometry.coordinates[0]}
                zoom={5}
              />
            </div>
          )}
          <div className="descriptionColumn">
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

        <div className={styles.listingsAndStats}>
          <div className="listingsColumn">{pricesOrListings || null}</div>
          <div className="statsColumn">
            <Stats
              description={t`Data for this project and vintage`}
              currentSupply={props.project.currentSupply}
              totalRetired={props.project.totalRetired}
              allListings={allListings || []}
              activeListings={activeListings || []}
            />
            <Activities
              activities={props.project.activities || []}
              showTitles={false}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};
