import { useGetProjectsId } from ".generated/carbonmark-api-sdk/hooks";
import { cx } from "@emotion/css";
import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { Anchor } from "@klimadao/lib/components";
import { REGISTRIES } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import { Activities } from "components/Activities";
import Carousel from "components/Carousel/Carousel";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { Vintage } from "components/Vintage";
import { formatList, formatToPrice } from "lib/formatNumbers";
import { getActiveListings, getAllListings } from "lib/listingsGetter";
import { isCategoryName, isTokenPrice } from "lib/types/carbonmark.guard";
import {
  CategoryName,
  DetailedProject,
  Listing,
  TokenPrice,
} from "lib/types/carbonmark.types";
import { extract, notNil, selector } from "lib/utils/functional.utils";
import { compact, concat, isEmpty, isNil, sortBy } from "lodash";
import { NextPage } from "next";
import { useState } from "react";
import { SWRConfig } from "swr";
import { PoolPrice } from "./BuyOptions/PoolPrice";
import { SellerListing } from "./BuyOptions/SellerListing";
import { ProjectMap } from "./ProjectMap";
import * as styles from "./styles";

export type PageProps = {
  project: DetailedProject;
  projectID: string;
};

const Page: NextPage<PageProps> = (props) => {
  const { data: project } = useGetProjectsId(props.projectID);
  const [isExpanded, setIsExpanded] = useState(false);
  const bestPrice = project?.price;

  // Project should always be defined from static page props!
  if (isNil(project)) {
    console.error(`Invalid project for ${props.projectID}`);
    return null;
  }

  const listings = getAllListings(project.listings);
  const prices = compact(project?.prices);
  const activeListings = getActiveListings(project.listings);
  const methodologies = compact(project.methodologies);
  const category = methodologies.at(0)?.category ?? "Other";
  const allMethodologyIds = compact(methodologies.map(extract("id")));
  const allMethodologyNames = compact(methodologies.map(extract("name")));

  if (!isCategoryName(category)) {
    console.error(`Invalid category name: ${category}`);
    return null;
  }

  const pricesAndListings: (Listing | TokenPrice)[] = sortBy(
    concat<Listing | TokenPrice>(listings, prices),
    (x) => Number(x.singleUnitPrice)
  );

  const pricesOrListings = pricesAndListings.map((element, index) => {
    if (isTokenPrice(element)) {
      return (
        <PoolPrice
          key={element.singleUnitPrice + index}
          price={element}
          project={project}
          isBestPrice={bestPrice === element.singleUnitPrice}
        />
      );
    }

    return (
      <SellerListing
        key={element.singleUnitPrice + index}
        project={project}
        listing={element}
        isBestPrice={bestPrice === element.singleUnitPrice}
      />
    );
  });
  /** Match the registry key "VCS" to the correct registry */
  const registry = Object.values(REGISTRIES).find(
    selector("id", project.registry)
  )?.title;

  return (
    <>
      <PageHead
        title={`${project.registry}-${project.projectID} | Carbonmark`}
        mediaTitle={`${project.registry}-${project.projectID} | ${project.name}`}
        metaDescription={t`View and purchase this carbon offset project on Carbonmark`}
      />

      <Layout>
        <div className={styles.projectControls}>
          <LoginButton className="desktopLogin" />
        </div>
        <div className={styles.projectHeader}>
          <ProjectImage category={category} />
          <div className={styles.imageGradient} />
          <Text t="h4" className={styles.projectHeaderText}>
            {project.name || "Error - No project name found"}
          </Text>
          <div className={styles.tags}>
            <Text t="h5" className={styles.projectHeaderText}>
              {project.registry}-{project.projectID}
            </Text>
            <Vintage vintage={project.vintage} />
            {!isEmpty(methodologies) ? (
              methodologies.map((methodology) => (
                <Category
                  key={methodology?.id}
                  category={(methodology.category as CategoryName) ?? "Other"}
                />
              ))
            ) : (
              <Category category={category} />
            )}
            {notNil(registry) && <Text className={styles.tag}>{registry}</Text>}
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
          <div className={styles.methodology}>
            <Text t="h5" color="lighter" align="end">
              <Trans>Methodology</Trans>
            </Text>
            <Text t="body1" color="lighter" align="end">
              {formatList(allMethodologyIds, "narrow")}
              {project.methodologies?.length && (
                <TextInfoTooltip
                  className={styles.infoContent}
                  align="start"
                  tooltip={formatList(allMethodologyNames, "short")}
                >
                  <InfoOutlined />
                </TextInfoTooltip>
              )}
            </Text>
          </div>
        </div>
        <div
          className={cx(styles.mapAndDescription, {
            hasMap: !!project.location,
          })}
        >
          {project?.images?.length ? (
            <div className={styles.carouselWrapper}>
              <Carousel images={project.images} location={project.location} />
            </div>
          ) : (
            <>
              {project.location && (
                <div className="mapColumn">
                  <ProjectMap
                    lat={project.location?.geometry.coordinates[1]}
                    lng={project.location?.geometry.coordinates[0]}
                    zoom={1.5}
                  />
                </div>
              )}
            </>
          )}
          <div className="descriptionColumn">
            <div className="description">
              <Text t="h5" color="lighter">
                <Trans>Description</Trans>
              </Text>
              <Text t="body1" className={cx({ collapsed: !isExpanded })}>
                {project.long_description ||
                  project.description ||
                  "No project description found"}
              </Text>
            </div>
            <Text
              role="button"
              className="expandedText"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? t`Read Less` : t`Read More`}
            </Text>
            {notNil(project.url) && (
              <Anchor
                target="_blank"
                rel="noopener noreferrer"
                href={project.url}
                className="registryLink"
              >
                <Trans>
                  View Registry Details <LaunchIcon />
                </Trans>
              </Anchor>
            )}
          </div>
        </div>
        <div className={styles.listingsHeader}>
          <Text t="h4">Listings</Text>
          {pricesAndListings ? (
            <Text t="body1">
              We found <strong>{pricesAndListings.length}</strong> prices for
              this project:
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
              totalSupply={project.stats.totalSupply}
              totalRetired={project.stats.totalRetired}
              allListings={listings}
              activeListings={activeListings}
            />
            <Activities activities={project.activities} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const Project: NextPage<PageProps> = (props) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        fallback: {
          [`/projects/${props.projectID}`]: props.project,
        },
      }}
    >
      <Page {...props} />
    </SWRConfig>
  );
};
