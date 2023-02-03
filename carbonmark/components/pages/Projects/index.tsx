import { ProjectImage } from "@klimadao/carbonmark/components/pages/Project/ProjectImage";
import { Text } from "@klimadao/lib/components";
import { Project } from "@klimadao/lib/types/carbonmark";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { PageHead } from "components/shared/PageHead";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import * as styles from "./styles";
type Props = {
  projects: Project[];
};

export const Projects: NextPage<Props> = (props) => {
  const { locale } = useRouter();

  const hasProjects = !!props.projects.length;
  const sortedProjects =
    hasProjects &&
    props.projects.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

  return (
    <>
      <PageHead
        title="Carbonmark - Projects"
        mediaTitle="Carbonmark - Projects"
        metaDescription="Carbonmark - Projects"
      />

      <Layout>
        <div className={styles.list}>
          {sortedProjects &&
            sortedProjects.map((project, index) => (
              <Link
                key={project.key + "-" + index}
                href={createProjectLink(project)}
                passHref
              >
                <div className={styles.card}>
                  <div className={styles.cardImage}>
                    {!!project.category?.id && (
                      <ProjectImage category={project.category.id} />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <Text t="h4">
                      {formatBigToPrice(project.price, locale)}
                    </Text>
                    <Text t="h5">
                      {project.name || "! MISSING PROJECT NAME !"}
                    </Text>
                    <Text t="caption">{project.methodology}</Text>
                    <div className={styles.tags}>
                      {!!project.category?.id && (
                        <Category category={project.category.id} />
                      )}
                      {project.isPoolProject && (
                        <SyncOutlinedIcon fontSize="large" />
                      )}
                      <Vintage vintage={project.vintage} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {!hasProjects && <Text>No projects found from Carbonmark API</Text>}
        </div>
      </Layout>
    </>
  );
};
