import { BBox } from "@turf/helpers";
import { NEXT_PUBLIC_MAPBOX_TOKEN } from "lib/constants";
import { compact, isNil } from "lodash";
import { default as MapBoxGL, default as mapboxgl } from "mapbox-gl";
import Supercluster from "supercluster";
import { DEFAULT_OPTS } from "./carbonmark-map.constants";
import { CarbonmarkMapOpts } from "./carbonmark-map.types";

if (isNil(NEXT_PUBLIC_MAPBOX_TOKEN))
  throw new Error("Missing NEXT_PUBLIC_MAPBOX_TOKEN env var");
MapBoxGL.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN;

class CarbonmarkMap extends mapboxgl.Map {
  clusterer: Supercluster;
  markers: MapBoxGL.Marker[] = [];

  constructor(container: string | HTMLElement, opts?: CarbonmarkMapOpts) {
    super({ container, ...DEFAULT_OPTS, ...opts });

    // Update markers on move
    this.on("moveend", this.renderMarkers);
    this.on("zoomend", this.renderMarkers);

    this.clusterer = new Supercluster({
      radius: 40,
      maxZoom: 16,
    });

    this.clusterer.load(compact(opts?.markers));
  }

  clear() {
    // Remove existing markers
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  addMarker(latLng: [number, number], popup?: MapBoxGL.Popup) {
    const marker = new MapBoxGL.Marker()
      .setLngLat(latLng)
      .setPopup(popup)
      .addTo(this);

    this.markers.push(marker);
  }

  renderMarkers() {
    this.clear();

    const bounds = this.getBounds().toArray().flat() as BBox;
    const zoom = this.getZoom();
    const clusters = this.clusterer.getClusters(bounds, Math.floor(zoom));

    clusters.forEach((cluster) => {
      const isCluster = cluster?.properties?.cluster;
      const popup = isCluster
        ? new MapBoxGL.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>" +
                "Cluster" +
                "</h3><p>" +
                "Contains " +
                cluster.properties.point_count +
                " markers" +
                "</p>"
            )
        : undefined;
      this.addMarker(cluster.geometry.coordinates as [number, number], popup);
    });
  }
}

export default CarbonmarkMap;
