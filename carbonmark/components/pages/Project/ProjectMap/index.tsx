import { NEXT_PUBLIC_MAPBOX_TOKEN } from "lib/constants";
import type { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import * as styles from "./styles";
interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
}

export const ProjectMap = (props: MapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  useEffect(() => {
    // initialize map only once
    if (map.current) return;
    async function mapItUp() {
      if (!mapContainer.current || !NEXT_PUBLIC_MAPBOX_TOKEN) return;
      const MapBoxGL = (await import("mapbox-gl")).default;
      MapBoxGL.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN;
      map.current = new MapBoxGL.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [props.lng, props.lat],
        zoom: props.zoom,
      });
      new MapBoxGL.Marker()
        .setLngLat([props.lng, props.lat])
        .addTo(map.current);
    }
    mapItUp();
  }, []);
  return <div ref={mapContainer} className={styles.mapBox} />;
};
