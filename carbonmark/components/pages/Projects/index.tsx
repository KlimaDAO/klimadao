import { Project } from ".generated/carbonmark-api-sdk/types";
import { cx } from "@emotion/css";
import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import { t } from "@lingui/macro";
import { useMediaQuery } from "@mui/material";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { fetchProjects } from "hooks/useFetchProjects";
import { useProjectsParams } from "hooks/useProjectsFilterParams";
import { urls } from "lib/constants";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ProjectsPageStaticProps } from "pages/projects";
import { useEffect, useState } from "react";
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
  const router = useRouter();

  // noSsr is required because it would return the server computed value on the first render to prevent hydratation issues
  const isMobile = !useMediaQuery(breakpoints.desktop, { noSsr: true });

  // Initialize projects with the value computed server side
  const [projects, setProjects] = useState<Project[]>(props.projects);

  const { params, updateQueryParams } = useProjectsParams();

  const fetchData = async () => {
    setProjects(await fetchProjects(router.query));
  };

  // Fetch data when the parameters change
  useEffect(() => {
    fetchData();
  }, [router.query]);

  //Force grid view on mobile
  useEffect(() => {
    if (isMobile && params.layout === "list") {
      updateQueryParams({ layout: "grid" });
    }
  }, [isMobile, params.layout]);

  const isMap = params.layout === "map";

  const noProjects = !projects?.length && !isMap;

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
        <ProjectsController projects={projects} />
        <div
          className={cx(styles.viewContainer, {
            [styles.projectsList]: !isMap,
          })}
        >
          {noProjects ? (
            <Text>{t`No projects found with current filters`}</Text>
          ) : (
            <View projects={projects} />
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
