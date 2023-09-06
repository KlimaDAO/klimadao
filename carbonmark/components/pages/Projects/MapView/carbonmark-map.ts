import { BBox } from "@turf/helpers";
import { Project } from "lib/types/carbonmark";
import { compact } from "lodash";
import { default as MapBoxGL, default as mapboxgl } from "mapbox-gl";
import Supercluster, { AnyProps, ClusterFeature } from "supercluster";
import { DEFAULT_OPTS } from "./carbonmark-map.constants";
import { CarbonmarkMapOpts } from "./carbonmark-map.types";

// if (isNil(NEXT_PUBLIC_MAPBOX_TOKEN))
//   throw new Error("Missing NEXT_PUBLIC_MAPBOX_TOKEN env var");

// MapBoxGL.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN;

const BRIGHT_BLUE = "#0019ff"; // var(--bright-blue)

class CarbonmarkMap extends mapboxgl.Map {
  points?: Supercluster.PointFeature<{ project: Project }>[];
  markers: MapBoxGL.Marker[] = [];
  clusterer?: Supercluster;

  constructor(container: string | HTMLElement, opts?: CarbonmarkMapOpts) {
    super({ container, ...DEFAULT_OPTS, ...opts });
    this.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    this.points = opts?.points;
    this.on("moveend", () => this.renderMarkers());
    this.on("zoomend", () => this.renderMarkers());
    this.on("load", () => this.renderMarkers());
  }

  // Remove existing markers
  clear() {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  addMarker(
    latLng: [number, number],
    args?: { popup?: MapBoxGL.Popup; el?: HTMLElement }
  ) {
    const marker = new MapBoxGL.Marker({
      element: args?.el,
      color: BRIGHT_BLUE,
    })
      .setLngLat(latLng)
      .setPopup(args?.popup)
      .addTo(this);

    this.markers.push(marker);

    return marker;
  }

  renderMarkers(points?: Supercluster.PointFeature<{ project: Project }>[]) {
    this.clear();
    this.points = points ?? this.points;

    const bounds = this.getBounds().toArray().flat() as BBox;
    const zoom = this.getZoom();

    this.clusterer = new Supercluster({
      radius: 40,
      maxZoom: 16,
    });
    this.clusterer.load(compact(this.points));

    const clusters = this.clusterer.getClusters(bounds, Math.floor(zoom));

    clusters.forEach((cluster) => {
      const coords = cluster.geometry.coordinates as [number, number];
      const isCluster = cluster?.properties?.cluster;
      if (isCluster) {
        this.addCluster(cluster as ClusterFeature<AnyProps>);
      } else {
        const project: Project = cluster.properties.project;

        const imgTag = project?.images?.length
          ? `<img src="${project.images?.at(0)?.url}"/>`
          : "";

        const popupHtml = `
          <div class="header">
            <p class="title">${project.key}</p>
            <p class="price">($${(parseFloat(project.price) % 1).toFixed(
              2
            )})</p>

          </div>
          ${imgTag}
          <p>${project.short_description}</p>
          <a class="link" href="projects/${project.key}-${project.vintage}">
            <b>More Info</b>
          </a>`;

        const popup = new MapBoxGL.Popup({ offset: 25 }).setHTML(popupHtml);

        this.addMarker(coords, { popup });
      }
    });
  }

  addCluster(cluster: Supercluster.ClusterFeature<Supercluster.AnyProps>) {
    const coords = cluster.geometry.coordinates as [number, number];
    const points = cluster.properties.point_count;
    const clusterId = cluster.properties.cluster_id;

    const el = document.createElement("div");
    el.addEventListener("click", () => {
      const clusterZoom = this.clusterer?.getClusterExpansionZoom(clusterId);
      this.flyTo({
        center: coords,
        zoom: clusterZoom, // adjust zoom level as needed
      });
    });

    el.innerHTML = `<div class="cluster">${points}</div>`;
    this.addMarker(coords, { el });
  }
}

export default CarbonmarkMap;
