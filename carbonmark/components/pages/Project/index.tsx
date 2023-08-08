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
import { useFetchProject } from "hooks/useFetchProject";
import { urls } from "lib/constants";
import { formatList, formatToPrice } from "lib/formatNumbers";
import {
  getActiveListings,
  getAllListings,
  sortPricesAndListingsByBestPrice,
} from "lib/listingsGetter";
import { getCategoryFromProject } from "lib/projectGetter";
import {
  CategoryName,
  Methodology,
  PriceFlagged,
  Project as ProjectType,
  ProjectBuyOption,
} from "lib/types/carbonmark";
import { notNil, selector } from "lib/utils/functional.utils";
import { NextPage } from "next";
import { useState } from "react";
import { SWRConfig } from "swr";
import { PoolPrice } from "./BuyOptions/PoolPrice";
import { SellerListing } from "./BuyOptions/SellerListing";
import { ProjectMap } from "./ProjectMap";
import * as styles from "./styles";

export type PageProps = {
  project: ProjectType;
  projectID: string;
};

const isPoolPrice = (option: ProjectBuyOption): option is PriceFlagged =>
  (option as PriceFlagged).isPoolProject !== undefined;

const Page: NextPage<PageProps> = (props) => {
  const { project } = useFetchProject(props.projectID);
  const [isExpanded, setIsExpanded] = useState(false);

  // Typeguard, project should always be defined from static page props!
  if (!project) {
    return null;
  }

  const allListings =
    Array.isArray(project.listings) && getAllListings(project.listings);
  const activeListings =
    (Array.isArray(project.listings) && getActiveListings(project.listings)) ||
    [];

  const category = getCategoryFromProject(project);
  const allMethodologyIds = project?.methodologies?.map(({ id }) => id) || [];
  const allMethodologyNames =
    project?.methodologies?.map(({ name }) => name) || [];

  // filtered on the backend
  const poolPrices = project?.prices || [];

  const sortedListingsAndPrices = sortPricesAndListingsByBestPrice(
    poolPrices,
    activeListings
  );

  const bestPrice = project.price;

  const pricesOrListings =
    !!sortedListingsAndPrices.length &&
    sortedListingsAndPrices.map((option, index) => {
      if (isPoolPrice(option)) {
        return (
          <PoolPrice
            key={option.singleUnitPrice + index}
            price={option}
            project={project}
            isBestPrice={bestPrice === option.singleUnitPrice}
          />
        );
      }

      return (
        <SellerListing
          key={option.singleUnitPrice + index}
          project={project}
          listing={option}
          isBestPrice={bestPrice === option.singleUnitPrice}
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
            {project?.methodologies?.length > 1 ? (
              project.methodologies.map((methodology: Methodology, index) => (
                <Category
                  key={`${methodology?.id}-${index}`}
                  category={methodology?.category as CategoryName}
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
              {props?.project?.methodologies?.length && (
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
            hasMap: !!project.geolocation,
          })}
        >
          {project?.images?.length ? (
            <div className={styles.carouselWrapper}>
              <Carousel
                images={project.images}
                geolocation={project.geolocation}
              />
            </div>
          ) : (
            <>
              {project.geolocation && (
                <div className="mapColumn">
                  <ProjectMap
                    lat={project.geolocation?.lat}
                    lng={project.geolocation?.lng}
                    zoom={5}
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
              totalSupply={project.stats.totalSupply}
              totalRetired={project.stats.totalRetired}
              allListings={allListings || []}
              activeListings={activeListings || []}
            />
            <Activities activities={project.activities || []} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const Project: NextPage<PageProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      fallback: {
        [`${urls.api.projects}/${props.projectID}`]: props.project,
      },
    }}
  >
    <Page {...props} />
  </SWRConfig>
);
