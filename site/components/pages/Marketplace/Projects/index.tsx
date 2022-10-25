import { NextPage } from "next";
import Link from "next/link";

import { Text, Section } from "@klimadao/lib/components";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { Project } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  projects: Project[];
};

export const MarketPlaceProjects: NextPage<Props> = (props) => {
  const hasProjects = !!props.projects.length;
  return (
    <>
      <PageHead
        title="KlimaDao - Marketplace Projects"
        mediaTitle="KlimaDao - Marketplace Projects"
        metaDescription="KlimaDao - Marketplace Projects"
      />

      <Navigation activePage="Home" />

      <Section variant="gray">
        <div className={styles.stack}>
          <Text t="h1">All Projects</Text>
        </div>
      </Section>
      <Section variant="gray" style={{ padding: "unset" }}>
        {hasProjects &&
          props.projects.map((project) => (
            <div className={styles.stack} key={project.key}>
              <Text t="h3">Name: {project.name}</Text>
              <Text t="caption">ID: {project.id}</Text>
              <Text t="caption">ProjectAddress: {project.projectAddress}</Text>
              <Text t="caption">ProjectID: {project.projectID}</Text>
              <Text t="caption">Registry: {project.registry}</Text>
              <Text t="caption">Vintage: {project.vintage}</Text>
              <Text t="caption">Methodology: {project.methodology}</Text>
              <Link
                href={`/marketplace/projects/${project.registry}-${project.projectID}-${project.vintage}`}
                passHref
              >
                <a className="address">Link to Project</a>
              </Link>
            </div>
          ))}
        {!hasProjects && (
          <div className={styles.stack}>
            <Text>No projects found from Marketplace API</Text>
          </div>
        )}
      </Section>
      <Footer />
    </>
  );
};
