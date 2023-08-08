import { BBox } from "@turf/helpers";
import { NEXT_PUBLIC_MAPBOX_TOKEN } from "lib/constants";
import { compact, isNil } from "lodash";
import { default as MapBoxGL, default as mapboxgl } from "mapbox-gl";
import Supercluster, { AnyProps, PointFeature } from "supercluster";

if (isNil(NEXT_PUBLIC_MAPBOX_TOKEN)) {
  throw new Error("Missing NEXT_PUBLIC_MAPBOX_TOKEN env var");
}

MapBoxGL.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN;

type Opts = Omit<mapboxgl.MapboxOptions, "container"> & {
  markers: PointFeature<AnyProps>[];
};

const DEFAULT_OPTS: Partial<mapboxgl.MapboxOptions> = {
  style: "mapbox://styles/mapbox/satellite-v9",
  center: [20, 0],
  zoom: -1,
};

class CarbonmarkMap extends mapboxgl.Map {
  clusterer: Supercluster;
  markers: MapBoxGL.Marker[] = [];

  constructor(container: string | HTMLElement, opts?: Opts) {
    super({ container, ...DEFAULT_OPTS, ...opts });

    this.on("moveend", this.renderMarkers);
    this.on("zoomend", this.renderMarkers);

    this.clusterer = new Supercluster({
      radius: 40,
      maxZoom: 16,
    });

    this.clusterer.load(compact(opts?.markers));
  }

  clear() {
    // For each marker, remove it from the map
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  renderMarkers() {
    // Reset
    this.clear();
    // Assuming `map` is your Mapbox instance
    const bounds = this.getBounds().toArray().flat() as BBox;
    const zoom = this.getZoom();
    const clusters = this.clusterer.getClusters(bounds, Math.floor(zoom));

    clusters.forEach((cluster) => {
      if (cluster?.properties?.cluster) {
        // This is a cluster, render it as a cluster
        const marker = new MapBoxGL.Marker()
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
          .addTo(this);
        this.markers.push(marker);
      } else {
        // This is a single point, render it as a marker
        const marker = new MapBoxGL.Marker()
          .setLngLat(cluster.geometry.coordinates as [number, number])
          .addTo(this);

        this.markers.push(marker);
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
}

export default CarbonmarkMap;
