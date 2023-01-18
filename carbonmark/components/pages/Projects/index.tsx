import { Text } from "@klimadao/lib/components";
import { Project } from "@klimadao/lib/types/marketplace";
import { Category } from "components/Category";
import { MarketplaceLayout } from "components/Layout";
import { ProjectImage } from "components/ProjectImage";
import { PageHead } from "components/shared/PageHead";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { NextPage } from "next";
import Link from "next/link";
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

      <MarketplaceLayout>
        <div className={styles.list}>
          {hasProjects &&
            props.projects.map((project, index) => (
              <Link
                key={project.key + "-" + index}
                href={createProjectLink(project)}
                passHref
              >
                <div className={styles.card}>
                  <div className={styles.cardImage}>
                    <ProjectImage category={project.category.id} />
                  </div>
                  <div className={styles.cardContent}>
                    <Text t="h4">{project.name}</Text>
                    <Text t="caption">{project.methodology}</Text>
                    <div className={styles.tags}>
                      <Category category={project.category.id} />
                      <Vintage vintage={project.vintage} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {!hasProjects && <Text>No projects found from Marketplace API</Text>}
        </div>
      </MarketplaceLayout>
    </>
  );
};
