import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { NextPage } from "next";
import Link from "next/link";
import { MarketplaceLayout } from "../Layout";

import { Project } from "@klimadao/lib/types/marketplace";
import { PageHead } from "components/PageHead";
import {
  createProjectPurchaseLink,
  createSellerLink,
} from "components/pages/Marketplace/lib/createUrls";
import {
  formatBigToPrice,
  formatBigToTonnes,
} from "components/pages/Marketplace/lib/formatNumbers";
import { getActiveListings } from "components/pages/Marketplace/lib/listingsGetter";
import { Card } from "components/pages/Marketplace/shared/Card";

import * as styles from "./styles";

type Props = {
  project: Project;
};

export const MarketPlaceProject: NextPage<Props> = (props) => {
  const activeListings =
    !!props.project.listings?.length &&
    getActiveListings(props.project.listings);

  return (
    <>
      <PageHead
        title={`KlimaDao - Marketplace Project: ${props.project.name}`}
        mediaTitle={`KlimaDao - Marketplace Project: ${props.project.name}`}
        metaDescription={`KlimaDao - Marketplace Project: ${props.project.name}`}
      />

      <MarketplaceLayout>
        <div className={styles.fullWidth}>
          <Text t="h1">SINGLE Project</Text>
        </div>

        <div className={styles.fullWidth}>
          <Text t="h3">Name: {props.project.name}</Text>
          <Text t="caption">ID: {props.project.id}</Text>
          <Text t="caption">
            ProjectAddress: {props.project.projectAddress}
          </Text>
          <Text t="caption">ProjectID: {props.project.projectID}</Text>
          <Text t="caption">Registry: {props.project.registry}</Text>
          <Text t="caption">Vintage: {props.project.vintage}</Text>
          <Text t="caption">Methodology: {props.project.methodology}</Text>

          <div className={styles.listings}>
            <Text t="h2">Listings:</Text>
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
                  <ButtonPrimary
                    label="Buy"
                    className={styles.buyButton}
                    href={createProjectPurchaseLink(props.project, listing.id)}
                  />
                </Card>
              ))}
          </div>

          <ButtonPrimary
            href={`/marketplace/projects`}
            label="Back to results"
            className={styles.projectLink}
          ></ButtonPrimary>
        </div>
      </MarketplaceLayout>
    </>
  );
};
