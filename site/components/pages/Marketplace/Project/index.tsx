import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { MarketplaceLayout } from "../Layout";

import { PageHead } from "components/PageHead";
import { Project } from "@klimadao/lib/types/marketplace";

import type { NextPageWithLayout } from "../../../../pages/_app";
import type { ReactElement } from "react";

import * as styles from "./styles";

type Props = {
  project: Project;
};

export const MarketPlaceProject: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <PageHead
        title={`KlimaDao - Marketplace Project: ${props.project.name}`}
        mediaTitle={`KlimaDao - Marketplace Project: ${props.project.name}`}
        metaDescription={`KlimaDao - Marketplace Project: ${props.project.name}`}
      />

      <div className={styles.fullWidth}>
        <Text t="h1">SINGLE Project</Text>
      </div>

      <div className={styles.fullWidth}>
        <Text t="h3">Name: {props.project.name}</Text>
        <Text t="caption">ID: {props.project.id}</Text>
        <Text t="caption">ProjectAddress: {props.project.projectAddress}</Text>
        <Text t="caption">ProjectID: {props.project.projectID}</Text>
        <Text t="caption">Registry: {props.project.registry}</Text>
        <Text t="caption">Vintage: {props.project.vintage}</Text>
        <Text t="caption">Methodology: {props.project.methodology}</Text>
        <ButtonPrimary
          href={`/marketplace/projects`}
          label="Back to results"
          className={styles.projectLink}
        ></ButtonPrimary>
      </div>
    </>
  );
};

MarketPlaceProject.getLayout = function getLayout(page: ReactElement) {
  return <MarketplaceLayout>{page}</MarketplaceLayout>;
};
