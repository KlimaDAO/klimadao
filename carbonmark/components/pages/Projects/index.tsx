import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { PoolIcon } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectsPageStaticProps } from "pages/projects";
import useSWR, { SWRConfig } from "swr";
import * as styles from "./styles";

const Page: NextPage = () => {
  const { locale } = useRouter();

  /**@todo add complex keys and fetch based on URL params */
  const { data: projects } = useSWR<Project[]>("/api/projects");

  const hasProjects = !!projects?.length;
  const sortedProjects =
    hasProjects &&
    projects?.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

  return (
    <>
      <PageHead
        title={t`Projects | Carbonmark`}
        mediaTitle={t`Browse Carbon Projects | Carbonmark`}
        metaDescription={t`Browse our massive inventory of verified carbon offset projects. Buy, sell, or offset in a few clicks.`}
      />

      <Layout fullWidth={true}>
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
                    <Text t="body1">{project.methodology}</Text>
                    <div className={styles.tags}>
                      {!!project.category?.id && (
                        <Category category={project.category.id} />
                      )}
                      {project.isPoolProject && <PoolIcon />}
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

export const Projects: NextPage<ProjectsPageStaticProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      /**
       * Prefill our API responses with server side fetched data
       * see: https://swr.vercel.app/docs/with-nextjs#pre-rendering-with-default-data
       */ fallback: {
        "/api/projects": props.projects,
        "/api/vintages": props.vintages,
        "/api/categories": props.categories,
        "/api/countries": props.countries,
      },
    }}
  >
    <Page />
  </SWRConfig>
);
