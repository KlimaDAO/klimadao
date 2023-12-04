import { cx } from "@emotion/css";
import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import { t } from "@lingui/macro";
import { useMediaQuery } from "@mui/material";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { useFetchProjects } from "hooks/useFetchProjects";
import { useProjectsParams } from "hooks/useProjectsFilterParams";
import { urls } from "lib/constants";
import { NextPage } from "next";
import { ProjectsPageStaticProps } from "pages/projects";
import { useEffect } from "react";
import { SWRConfig } from "swr";
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

const Page: NextPage<ProjectsPageStaticProps> = (props) => {
  // noSsr is required because it would return the server computed value on the first render to prevent hydratation issues
  const isMobile = !useMediaQuery(breakpoints.desktop, { noSsr: true });

  // Initialize projects with the value computed server side
  const { data: projects = null, isLoading, isValidating } = useFetchProjects();
  const { params, updateQueryParams } = useProjectsParams();

  const displayedProjects = projects != null ? projects : props.projects;

  // Fetch data when the parameters change

  //Force grid view on mobile
  useEffect(() => {
    if (isMobile && params.layout === "list") {
      updateQueryParams({ layout: "grid" });
    }
  }, [isMobile, params.layout]);

  const isMap = params.layout === "map";

  const noProjects = !displayedProjects?.length && !isMap;

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
      <Layout fullContentWidth={isMap} fullContentHeight={isMap}>
        <ProjectsController
          projects={displayedProjects}
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
          ) : (
            <View projects={displayedProjects} />
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
        [urls.api.projects]: props.projects,
        [urls.api.vintages]: props.vintages,
        [urls.api.categories]: props.categories,
        [urls.api.countries]: props.countries,
      },
    }}
  >
    <Page {...props} />
  </SWRConfig>
);
