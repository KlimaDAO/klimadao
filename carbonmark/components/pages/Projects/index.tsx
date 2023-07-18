import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectsController } from "components/pages/Project/ProjectsController";
import { PROJECT_SORT_FNS } from "components/ProjectFilterModal/constants";
import { ProjectImage } from "components/ProjectImage";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { useFetchProjects } from "hooks/useFetchProjects";
import { urls } from "lib/constants";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { CategoryName, Methodology } from "lib/types/carbonmark";
import { get, identity, isEmpty } from "lodash";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectsPageStaticProps } from "pages/projects";
import { SWRConfig } from "swr";
import * as styles from "./styles";

const Page: NextPage = () => {
  const { locale, query } = useRouter();

  const sortKey = String(query["sort"]);

  const { projects, isLoading, isValidating } = useFetchProjects();

  const sortFn = get(PROJECT_SORT_FNS, sortKey) ?? identity;

  const sortedProjects = sortFn(projects);

  // only show the spinner when there are no cached results to show
  // when re-doing a search with cached results, this will be false -> results are shown, and the query runs in the background
  const showLoadingProjectsSpinner =
    isEmpty(sortedProjects) && (isLoading || isValidating);

  return (
    <>
      <PageHead
        title={t`Marketplace | Carbonmark`}
        mediaTitle={t`Marketplace | Carbonmark`}
        metaDescription={t`Choose from over 20 million verified digital carbon credits from hundreds of projects - buy, sell, or retire carbon now.`}
      />
      <Layout>
        <div className={styles.projectsControls}>
          <ProjectsController />
          <LoginButton className="desktopLogin" />
        </div>

        <div className={styles.projectsList}>
          {!sortedProjects?.length && !isValidating && !isLoading && (
            <Text>No projects found from Carbonmark API</Text>
          )}
          {showLoadingProjectsSpinner && <SpinnerWithLabel />}
          {sortedProjects?.map((project, index) => (
            <Link
              key={project.key + "-" + index}
              href={createProjectLink(project)}
              passHref
              className={styles.card}
            >
              <div className={styles.cardImage}>
                <ProjectImage category={getCategoryFromProject(project)} />
              </div>
              <div className={styles.cardContent}>
                <Text t="h4">{formatToPrice(project.price, locale)}</Text>
                <Text t="h5">{project.name || "! MISSING PROJECT NAME !"}</Text>
                <Text t="body1" className={styles.cardDescription}>
                  {project.short_description ||
                    project.description ||
                    t`No project description found`}
                </Text>
                <div className={styles.tags}>
                  <Vintage vintage={project.vintage} />
                  {project?.methodologies?.length > 1 ? (
                    project.methodologies.map(
                      (methodology: Methodology, index) => (
                        <Category
                          key={`${methodology?.id}-${index}`}
                          category={methodology?.category as CategoryName}
                        />
                      )
                    )
                  ) : (
                    <Category category={getCategoryFromProject(project)} />
                  )}
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
        [urls.api.projects]: props.projects,
        [urls.api.vintages]: props.vintages,
        [urls.api.categories]: props.categories,
        [urls.api.countries]: props.countries,
      },
    }}
  >
    <Page />
  </SWRConfig>
);
