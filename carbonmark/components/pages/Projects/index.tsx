import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { Spinner } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { useFetchProjects } from "hooks/useFetchProjects";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectsPageStaticProps } from "pages/projects";
import { SWRConfig } from "swr";
import * as styles from "./styles";

const Page: NextPage = () => {
  const { locale } = useRouter();

  const {
    projects: unsafeProjects,
    isLoading,
    isValidating,
  } = useFetchProjects();

  // TEMP: the api has a bug where it sometimes returns `null`
  const safeProjects = unsafeProjects?.filter((p) => !!p);

  const sortedProjects =
    isLoading || !safeProjects
      ? undefined
      : safeProjects.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

  // only show the spinner when there are no cached results to show
  // when re-doing a search with cached results, this will be false -> results are shown, and the query runs in the background
  const showLoadingProjectsSpinner =
    isLoading || (isValidating && !sortedProjects?.length);

  return (
    <>
      <PageHead
        title={t`Projects | Carbonmark`}
        mediaTitle={t`Browse Carbon Projects | Carbonmark`}
        metaDescription={t`Browse our massive inventory of verified carbon offset projects. Buy, sell, or offset in a few clicks.`}
      />

      <Layout fullWidth={true}>
        <div className={styles.list}>
          {!sortedProjects?.length && !isValidating && !isLoading && (
            <Text>No projects found from Carbonmark API</Text>
          )}
          {showLoadingProjectsSpinner && (
            <div className={styles.loadingPlaceholder}>
              <Spinner />
              <Text>Loading projects...</Text>
            </div>
          )}
          {sortedProjects?.map((project, index) => (
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
                  <Text t="h4">{formatBigToPrice(project.price, locale)}</Text>
                  <Text t="h5">
                    {project.name || "! MISSING PROJECT NAME !"}
                  </Text>
                  {project.description && (
                    <Text t="body1" className={styles.cardDescription}>
                      {project.description}
                    </Text>
                  )}
                  <div className={styles.tags}>
                    <Vintage vintage={project.vintage} />
                    {!!project.category?.id && (
                      <Category category={project.category.id} />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
};

export const Projects: NextPage<ProjectsPageStaticProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      // Prefill our API responses with server side fetched data
      // see: https://swr.vercel.app/docs/with-nextjs#pre-rendering-with-default-data
      fallback: {
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
