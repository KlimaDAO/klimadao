import { Project } from "lib/types/carbonmark.types";
import { compact } from "lodash";
import { map as mapFn, pipe, uniqBy } from "lodash/fp";
import "mapbox-gl/dist/mapbox-gl.css";
import { FC, useEffect, useRef } from "react";
import ViewProps from "../props";
import * as styles from "./MapView.styles";
import CarbonmarkMap from "./carbonmark-map";

export const MapView: FC<ViewProps> = ({ projects }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<CarbonmarkMap | null>(null);

  //Convert projects to GeoJSON Features
  const fn = pipe(
    uniqBy("key"), // @todo this is a temporary fix until we have a better solution to show multiple vintages.
    mapFn((project: Project) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...project.location!,
      type: "Feature" as const,
      properties: { project },
    })),
    compact
  );
  const points = fn(projects);

  // Update markers on change
  useEffect(() => {
    map.current?.renderMarkers(points);
  }, [points.length, map.current]);

  // Initial mapbox load
  useEffect(() => {
    if (mapContainer.current) {
      map.current = new CarbonmarkMap(mapContainer.current, { points });
    }
  }, []);

  return <div ref={mapContainer} className={styles.mapBox} />;
};
