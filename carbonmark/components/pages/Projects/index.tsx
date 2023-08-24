import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { PROJECT_SORT_FNS } from "components/ProjectFilterModal/constants";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { useFetchProjects } from "hooks/useFetchProjects";
import { useProjectsParams } from "hooks/useProjectsFilterParams";
import { useResponsive } from "hooks/useResponsive";
import { urls } from "lib/constants";
import { get, identity, isEmpty } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ProjectsPageStaticProps } from "pages/projects";
import { SWRConfig } from "swr";
import { MapView } from "./MapView/MapView";
import ProjectsController from "./ProjectsController";
import { GridView } from "./ProjectView/GridView";
import { ListView } from "./ProjectView/ListView";

const views = {
  grid: GridView,
  list: ListView,
  map: MapView,
};

const Page: NextPage = () => {
  const router = useRouter();
  const { isMobile } = useResponsive();

  const { params } = useProjectsParams();
  const { projects, isLoading, isValidating } = useFetchProjects();

  const sortFn = get(PROJECT_SORT_FNS, params.sort) ?? identity;
  const sortedProjects = sortFn(projects);

  // only show the spinner when there are no cached results to show
  // when re-doing a search with cached results, this will be false -> results are shown, and the query runs in the background
  const showLoadingProjectsSpinner =
    isEmpty(sortedProjects) && (isLoading || isValidating);

  if (!router.isReady) {
    // need to prevent the initial grid view from flashing initially
    // after setting the layout as "list" and reloading the browser.
    return null;
  }
  const isMap = params.layout === "map";

  const View = isMobile ? GridView : views[params.layout];

  return (
    <>
      <PageHead
        title={t`Marketplace | Carbonmark`}
        mediaTitle={t`Marketplace | Carbonmark`}
        metaDescription={t`Choose from over 20 million verified digital carbon credits from hundreds of projects - buy, sell, or retire carbon now.`}
      />
      <Layout fullContentWidth={isMap} fullContentHeight={isMap}>
        <ProjectsController />
        {!sortedProjects?.length && !isValidating && !isLoading && (
          <Text>{t`No projects found with current filters`}</Text>
        )}
        {showLoadingProjectsSpinner ? (
          <SpinnerWithLabel />
        ) : (
          <View projects={projects} />
        )}
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
