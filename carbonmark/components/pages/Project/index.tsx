import { Text } from "@klimadao/lib/components";
import { Project as ProjectType } from "@klimadao/lib/types/carbonmark";
import { Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import { Activities } from "components/Activities";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { ProjectImage } from "components/ProjectImage";
import { PageHead } from "components/shared/PageHead";
import { Stats } from "components/Stats";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { Vintage } from "components/Vintage";
import { formatToPrice } from "lib/formatNumbers";
import {
  getActiveListings,
  getAllListings,
  getAmountLeftToSell,
  getLowestPriceFromListings,
  getSortByUpdateListings,
  getTotalAmountSold,
} from "lib/listingsGetter";
import { NextPage } from "next";
import Link from "next/link";
import { ProjectListing } from "./ProjectListing";

import * as styles from "./styles";

type Props = {
  project: ProjectType;
};

export const Project: NextPage<Props> = (props) => {
  const allListings =
    Array.isArray(props.project.listings) &&
    getAllListings(props.project.listings);
  const activeListings =
    Array.isArray(props.project.listings) &&
    getActiveListings(props.project.listings);

  const sortedListings =
    !!activeListings &&
    !!activeListings.length &&
    getSortByUpdateListings(activeListings);

  return (
    <>
      <PageHead
        title={`Carbonmark - Project: ${props.project.name}`}
        mediaTitle={`Carbonmark - Project: ${props.project.name}`}
        metaDescription={`Carbonmark - Project: ${props.project.name}`}
      />

      <Layout>
        <div className={styles.fullWidth}>
          <Link href={"/projects"} className={styles.backToResults}>
            <ArrowBack className="arrow" />
            <Trans id="project.single.button.back_to_projects">
              Back to Projects
            </Trans>
          </Link>
        </div>

        <div className={styles.fullWidth}>
          <div className={styles.projectHeader}>
            {!!props.project.category?.id && (
              <ProjectImage category={props.project.category.id} />
            )}
            <div className={styles.imageGradient}></div>
            <div className="stack">
              <Text t="h4" align="center" className={styles.projectHeaderText}>
                {props.project.name || "! MISSING PROJECT NAME !"}
              </Text>
            </div>
            <div className={styles.tags}>
              <Text t="badge" className={styles.projectHeaderText}>
                {props.project.key}
              </Text>
              <Vintage vintage={props.project.vintage} />
              {!!props.project.category?.id && (
                <Category category={props.project.category.id} />
              )}
              {props.project.isPoolProject && (
                <SyncOutlinedIcon fontSize="large" />
              )}
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <div className="best-price">
            {sortedListings && (
              <>
                <Text t="h5" color="lighter">
                  <span className="badge">
                    {formatToPrice(getLowestPriceFromListings(activeListings))}
                  </span>
                </Text>
                <Text t="h5" color="lighter">
                  <Trans id="project.single.best_price">Best Price</Trans>
                </Text>
              </>
            )}
          </div>
          <div className="methodology">
            <Text t="caption" color="lighter">
              <Trans id="project.single.methodology">Methodology:</Trans>
            </Text>
            <Text t="caption" color="lighter" align="end">
              {props.project.registry}
            </Text>
          </div>
        </div>

        <div className={styles.listingsHeader}>
          <Text t="h5">Listings</Text>
          {sortedListings && (
            <Text t="caption">
              We found <strong>{activeListings.length}</strong> prices for this
              project:
            </Text>
          )}
        </div>

        <TwoColLayout>
          <Col>
            <div className={styles.listings}>
              {sortedListings &&
                sortedListings.map((listing) => (
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
            <Activities activities={props.project.activities || []} />
          </Col>
        </TwoColLayout>
      </Layout>
    </>
  );
};
