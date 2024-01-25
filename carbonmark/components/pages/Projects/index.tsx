import { cx } from "@emotion/css";
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
import { useEffect } from "react";
import { SWRConfig } from "swr";
import { BankTransferBanner } from "./Banners/BankTransfer";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";
import LazyLoadingMapView from "./MapView/LazyLoadingMapView";
import ProjectsController from "./ProjectsController";
import * as styles from "./styles";

const views = {
  grid: GridView,
  list: ListView,
  map: LazyLoadingMapView,
};

const Page: NextPage = () => {
  const router = useRouter();
  const { isMobile } = useResponsive();

  const { params, updateQueryParams } = useProjectsParams();

  const { data: projects = [], isLoading, isValidating } = useFetchProjects();

  const sortFn = get(PROJECT_SORT_FNS, params.sort) ?? identity;
  const sortedProjects = sortFn(projects);

  //Force grid view on mobile
  useEffect(() => {
    if (isMobile && params.layout === "list") {
      updateQueryParams({ layout: "grid" });
    }
  }, [isMobile, params.layout]);

  const isMap = params.layout === "map";

  // only show the spinner when there are no cached results to show
  // when re-doing a search with cached results, this will be false -> results are shown, and the query runs in the background
  const isFetching =
    isEmpty(sortedProjects) && (isLoading || isValidating) && !isMap;

  const noProjects =
    !sortedProjects?.length && !isValidating && !isLoading && !isMap;

  if (!router.isReady) {
    // need to prevent the initial grid view from flashing initially
    // after setting the layout as "list" and reloading the browser.
    return null;
  }

  // We need to force Grid View on mobile (this stops a delay in re-render)
  const View =
    isMobile && params.layout === "list" ? GridView : views[params.layout];

  return (
    <>
      <PageHead
        title={t`Marketplace | Carbonmark`}
        mediaTitle={t`Marketplace | Carbonmark`}
        metaDescription={t`Choose from over 20 million verified digital carbon credits from hundreds of projects - buy, sell, or retire carbon now.`}
      />
      <Layout
        customCss={styles.featureBanner}
        fullContentWidth={isMap}
        fullContentHeight={isMap}
      >
        {!isMap && <BankTransferBanner />}
        <ProjectsController
          projects={projects}
          isLoading={isLoading}
          isValidating={isValidating}
        />
        <div
          className={cx(styles.viewContainer, {
            [styles.projectsList]: !isMap,
          })}
        >
          {noProjects ? (
            <Text>{t`No projects found with current filters`}</Text>
          ) : isFetching ? (
            <SpinnerWithLabel />
          ) : (
            <View projects={sortedProjects} />
          )}
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
        ["/projects"]: props.projects,
        [urls.api.vintages]: props.vintages,
        [urls.api.categories]: props.categories,
        [urls.api.countries]: props.countries,
      },
    }}
  >
    <Page />
  </SWRConfig>
);
