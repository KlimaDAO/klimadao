import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { t } from "@lingui/macro";
import { BBox } from "@turf/helpers";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { useFetchProjects } from "hooks/useFetchProjects";
import { NEXT_PUBLIC_MAPBOX_TOKEN, urls } from "lib/constants";
import { compact } from "lodash";
import { get, map as mapFn, pipe } from "lodash/fp";
import MapBoxGL, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { NextPage } from "next";
import { ProjectsPageStaticProps } from "pages/projects";
import { useEffect, useRef } from "react";
import Supercluster from "supercluster";
import { SWRConfig } from "swr";
import * as styles from "./MapView.styles";

export const Page = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const { projects } = useFetchProjects();

  // Assuming `projects` is your array of data
  const fn = pipe(mapFn(get("location")), compact);
  const points = fn(projects);

  const superCluster = new Supercluster({
    radius: 40,
    maxZoom: 16,
  });

  superCluster.load(compact(points));

  useEffect(() => {
    console.log(map.current?.getBounds());
  }, [map.current?.getZoom()]);

  useEffect(() => {
    if (map.current) {
      // Assuming `map` is your Mapbox instance
      const bounds = map.current.getBounds().toArray().flat() as BBox;
      const zoom = map.current.getZoom();
      const clusters = superCluster.getClusters(bounds, Math.floor(zoom));

      clusters.forEach((cluster) => {
        if (map.current && cluster?.properties?.cluster) {
          // This is a cluster, render it as a cluster
          new MapBoxGL.Marker()
            .setLngLat(cluster.geometry.coordinates as [number, number])
            .setPopup(
              new MapBoxGL.Popup({ offset: 25 }) // add popups
                .setHTML(
                  "<h3>" +
                    "Cluster" +
                    "</h3><p>" +
                    "Contains " +
                    cluster.properties.point_count +
                    " markers" +
                    "</p>"
                )
            )
            .addTo(map.current);
        } else {
          if (map.current) {
            // This is a single point, render it as a marker
            new MapBoxGL.Marker()
              .setLngLat(cluster.geometry.coordinates as [number, number])
              .addTo(map.current);
          }
        }
      });

      //   compact(projects).forEach((project) => {
      //     if (map.current && project.location)
      //       new MapBoxGL.Marker()
      //         .setLngLat([
      //           project.location.geometry.coordinates[0],
      //           project.location.geometry.coordinates[1],
      //         ])
      //         .addTo(map.current);
      //   });
    }
  }, [projects, map?.current?.getBounds()]);

  useEffect(() => {
    // initialize map only once
    if (map.current) return;
    async function mapItUp() {
      if (!mapContainer.current || !NEXT_PUBLIC_MAPBOX_TOKEN) return;
      MapBoxGL.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN;
      map.current = new MapBoxGL.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-v9",
        center: [20, 0],
        zoom: -1,
      });
    }
    mapItUp();
  }, []);
  return (
    <>
      <PageHead
        title={t`Marketplace | Carbonmark`}
        mediaTitle={t`Marketplace | Carbonmark`}
        metaDescription={t`Choose from over 20 million verified digital carbon credits from hundreds of projects - buy, sell, or retire carbon now.`}
      />
      <Layout fullContentWidth>
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
