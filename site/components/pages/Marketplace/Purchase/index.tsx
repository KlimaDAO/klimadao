import { NextPage } from "next";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { MarketplaceLayout } from "../Layout";

import { PageHead } from "components/PageHead";
import { createProjectLink } from "components/pages/Marketplace/lib/createUrls";
import { Project } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  project: Project;
  listing: Listing;
};

export const MarketPlaceProjectPurchase: NextPage<Props> = (props) => {
  return (
    <>
      <PageHead
        title={`KlimaDao - Purchase Marketplace Project: ${props.project.name}`}
        mediaTitle={`KlimaDao - Purchase Marketplace Project: ${props.project.name}`}
        metaDescription={`KlimaDao - Purchase Marketplace Project: ${props.project.name}`}
      />

      <MarketplaceLayout>
        <div className={styles.fullWidth}>
          <Text t="h1">Purchase Project</Text>
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
          <ButtonPrimary
            href={createProjectLink(props.project)}
            label="Back to Project Details"
            className={styles.projectLink}
          ></ButtonPrimary>
        </div>
      </MarketplaceLayout>
    </>
  );
};
