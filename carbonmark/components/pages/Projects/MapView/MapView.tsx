import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { useFetchProjects } from "hooks/useFetchProjects";
import { urls } from "lib/constants";
import { compact } from "lodash";
import { get, map as mapFn, pipe } from "lodash/fp";
import "mapbox-gl/dist/mapbox-gl.css";
import { NextPage } from "next";
import { ProjectsPageStaticProps } from "pages/projects";
import { useEffect, useRef } from "react";
import { SWRConfig } from "swr";
import CarbonmarkMap from "./carbonmark-map";
import * as styles from "./MapView.styles";

export const Page = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<CarbonmarkMap | null>(null);
  const { projects } = useFetchProjects();

  // Assuming `projects` is your array of data
  const fn = pipe(mapFn(get("location")), compact);
  const points = fn(projects);

  useEffect(() => {
    map.current?.renderMarkers();
  }, [projects, map.current]);

  useEffect(() => {
    if (mapContainer.current) {
      map.current = new CarbonmarkMap(mapContainer.current, {
        markers: points,
      });
    }
  }, []);
  return (
    <>
      <PageHead
        title={t`Marketplace | Carbonmark`}
        mediaTitle={t`Marketplace | Carbonmark`}
        metaDescription={t`Choose from over 20 million verified digital carbon credits from hundreds of projects - buy, sell, or retire carbon now.`}
      />
      <Layout fullContentWidth fullContentHeight>
        <div ref={mapContainer} className={styles.mapBox} />
      </Layout>
    </>
  );
};

export const MapView: NextPage<ProjectsPageStaticProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      fallback: {
        [urls.api.projects]: props.projects,
      },
    }}
  >
    <Page />
  </SWRConfig>
);
