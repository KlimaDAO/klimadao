import { ThemeProvider, createTheme } from "@mui/material";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkLogoFull } from "components/Logos/CarbonmarkLogoFull";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { NEXT_PUBLIC_MAPBOX_TOKEN } from "lib/constants";
import { Project } from "lib/types/carbonmark.types";
import { notNil } from "lib/utils/functional.utils";
import { isNil } from "lodash";
import mapboxgl, { Map } from "mapbox-gl";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { KG_CARBON_KM_FLIGHT } from "./constants";
import * as styles from "./styles";
import { Point, haversine } from "./utils";

import { FeatureCollection, LineString } from "@turf/helpers";
import dynamic from "next/dynamic";
import { Place } from "../../GooglePlacesSelect";
import { RetireModal } from "./RetireModal";

// Dynamically import GooglePlacesSelect with SSR turned off
const GooglePlacesSelect = dynamic(
  () => import("../../GooglePlacesSelect"),
  { ssr: false } // This will load the component only on client side
);

export type PageProps = {
  projects: Project[];
};

const latLngToPoint = (latLng?: google.maps.LatLng): Point | null => {
  if (!latLng) return null;
  return {
    lat: latLng.lat(),
    lng: latLng.lng(),
  };
};

/** Overwrite the MUI theme used elsewhere */
const theme = createTheme({
  typography: {
    fontSize: 20,
  },
});

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export const RetirementDemo: NextPage<PageProps> = (props) => {
  const [distance, setDistance] = useState(0);
  const [source, setSource] = useState<Place | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);
  const [showModal, setShowModal] = useState(false);

  const estimate = (KG_CARBON_KM_FLIGHT * distance) / 1000;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  /** Estimate the distance travelled */
  useEffect(() => {
    const sourceCoords = latLngToPoint(source?.geometry?.location);
    const destCoords = latLngToPoint(destination?.geometry?.location);
    if (notNil(sourceCoords) && notNil(destCoords)) {
      const distance = haversine(sourceCoords, destCoords);
      setDistance(distance);


    }
  }, [source, destination]);

      //Center the map on changed route
  useEffect(() => {
    const sourceCoords = latLngToPoint(source?.geometry?.location);
    const destCoords = latLngToPoint(destination?.geometry?.location);

    if (notNil(sourceCoords) && notNil(destCoords)) {
      map.current?.fitBounds([
          [sourceCoords.lng, sourceCoords.lat],
          [destCoords.lng, destCoords.lat]
        ], {
          padding: { top: 10, bottom: 25, left: 15, right: 5 }
        });
      }
  }, [source, destination])

  // Initial mapbox load
  useEffect(() => {
    if (mapContainer.current && isNil(map.current)) {
      map.current = new Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [55.27, 25.2], // Dubai coordinates
        zoom: 3,
        pitch: 2,
      });
    }
  }, []);

  useEffect(() => {
    const mapRef = map.current;

    if (!mapRef?.isStyleLoaded()) return;

    // A simple line from origin to destination.
    const route: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [
                source?.geometry?.location?.lng() ?? 0,
                source?.geometry?.location?.lat() ?? 0
              ],
              [
                destination?.geometry?.location?.lng() ?? 0,
                destination?.geometry?.location?.lat() ?? 0,
              ],
            ],
          },
          properties: {},
        },
      ],
    };

    if (mapRef?.getLayer("route")) mapRef?.removeLayer("route");
    if (mapRef?.getSource("route")) mapRef?.removeSource("route");

    if (!mapRef?.getSource("route"))
      map.current?.addSource("route", {
        type: "geojson",
        data: route,
      });
    if (!mapRef?.getLayer("route"))
      map.current?.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: {
          "line-width": 2,
          "line-color": "#007cbf",
        },
      });
  }, [source, destination]);

  return (
    <>
      <PageHead
        title={"Offset your travel"}
        mediaTitle={"Offset your travel"}
        metaDescription={
          "Enter your travel itinerary and offset the carbon you produced"
        }
      />
      <ThemeProvider theme={theme}>
        <div className={styles.layout}>
          <div className={styles.logo}>
            <CarbonmarkLogoFull />
          </div>
          <div className={styles.form}>
            <div className={styles.fields}>
              <Text t="h5" className={styles.text}>
                Offset the emissions generated by your flight to COP
                <br />
                and support projects that support the planet.
              </Text>

              <GooglePlacesSelect
                label="From"
                onChange={(_, value) => setSource(value)}
                value={source}
                requestOpts={{ types: ["airport"] }}
              />
              <GooglePlacesSelect
                label="To"
                onChange={(_, value) => setDestination(value)}
                value={destination}
                requestOpts={{ types: ["airport"] }}
              />
            </div>

            <div ref={mapContainer} className={styles.mapbox} />

            <div className={styles.stats}>
              <div>
                <b>Distance:</b> {distance.toFixed(2)} km
              </div>
              <div>
                <b>Carbon Estimate:</b> {estimate.toFixed(2)} tonnes
              </div>
            </div>

            <ButtonPrimary
              label={`Offset`}
              onClick={() => setShowModal(true)}
              className={styles.button}
            />
          </div>
        </div>
        {showModal ? (
          <RetireModal
            open={showModal}
            estimate={estimate}
            projects={props.projects}
            onToggleModal={() => setShowModal(false)}
          />
        ) : null}
      </ThemeProvider>
    </>
  );
};

export default RetirementDemo;
