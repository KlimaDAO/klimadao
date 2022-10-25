import { NextPage } from "next";
import Link from "next/link";
import { Text, Section } from "@klimadao/lib/components";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { Project } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  project: Project;
};

export const MarketPlaceProject: NextPage<Props> = (props) => {
  return (
    <>
      <PageHead
        title={`KlimaDao - Marketplace Project: ${props.project.name}`}
        mediaTitle={`KlimaDao - Marketplace Project: ${props.project.name}`}
        metaDescription={`KlimaDao - Marketplace Project: ${props.project.name}`}
      />

      <Navigation activePage="Home" />

      <Section variant="gray">
        <div className={styles.stack}>
          <Text t="h1">SINGLE Project</Text>
        </div>
      </Section>
      <Section variant="gray" style={{ padding: "unset" }}>
        <div className={styles.stack}>
          <Text t="h3">Name: {props.project.name}</Text>
          <Text t="caption">ID: {props.project.id}</Text>
          <Text t="caption">
            ProjectAddress: {props.project.projectAddress}
          </Text>
          <Text t="caption">ProjectID: {props.project.projectID}</Text>
          <Text t="caption">Registry: {props.project.registry}</Text>
          <Text t="caption">Vintage: {props.project.vintage}</Text>
          <Text t="caption">Methodology: {props.project.methodology}</Text>
          <Link href={`/marketplace/projects`} passHref>
            <a className="address">back to Results</a>
          </Link>
        </div>
      </Section>
      <Footer />
    </>
  );
};
