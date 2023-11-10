import { cx } from "@emotion/css";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkLogoFull } from "components/Logos/CarbonmarkLogoFull";
import { PageHead } from "components/PageHead";
import { SimpleProjectCard } from "components/SimpleProjectCard";
import { Text } from "components/Text";
import { NEXT_PUBLIC_MAPBOX_TOKEN } from "lib/constants";
import { Project } from "lib/types/carbonmark.types";
import { notNil } from "lib/utils/functional.utils";
import { isNil } from "lodash";
import mapboxgl, { Map } from "mapbox-gl";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KG_CARBON_KM_FLIGHT } from "./constants";
import * as styles from "./styles";
import { Point, haversine } from "./utils";

import dynamic from "next/dynamic";
import { Place } from "./GooglePlacesSelect";

// Dynamically import GooglePlacesSelect with SSR turned off
const GooglePlacesSelect = dynamic(
  () => import("./GooglePlacesSelect"),
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
  const [project, setProject] = useState<Project>();
  const [source, setSource] = useState<Place | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);

  const estimate = (KG_CARBON_KM_FLIGHT * distance) / 1000;
  const price = Number(project?.price ?? 0);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = (values) => {
    const body = {
      ...values,
      quantity: estimate,
      tokenAddress: project?.projectAddress,
    };
    fetch("/api/retirement-demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  /** Estimate the distance travelled */
  useEffect(() => {
    const sourceCoords = latLngToPoint(source?.geometry?.location);
    const destCoords = latLngToPoint(destination?.geometry?.location);
    if (notNil(sourceCoords) && notNil(destCoords)) {
      const distance = haversine(sourceCoords, destCoords);
      setDistance(distance);
    }
  }, [source, destination]);

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

  // useEffect(() => {
  //   const mapRef = map.current;

  //   if (!mapRef?.isStyleLoaded()) return;

  //   // A simple line from origin to destination.
  //   const route: FeatureCollection<LineString> = {
  //     type: "FeatureCollection",
  //     features: [
  //       {
  //         type: "Feature",
  //         geometry: {
  //           type: "LineString",
  //           coordinates: [
  //             [source?.coordinates.lng ?? 0, source?.coordinates.lat ?? 0],
  //             [
  //               destination?.coordinates.lng ?? 0,
  //               destination?.coordinates.lat ?? 0,
  //             ],
  //           ],
  //         },
  //         properties: {},
  //       },
  //     ],
  //   };

  //   if (mapRef?.getSource("route")) mapRef?.removeSource("route");
  //   if (mapRef?.getLayer("route")) mapRef?.removeLayer("route");

  //   if (!mapRef?.getSource("route"))
  //     map.current?.addSource("route", {
  //       type: "geojson",
  //       data: route,
  //     });
  //   if (!mapRef?.getLayer("route"))
  //     map.current?.addLayer({
  //       id: "route",
  //       source: "route",
  //       type: "line",
  //       paint: {
  //         "line-width": 2,
  //         "line-color": "#007cbf",
  //       },
  //     });
  // }, [source, destination]);

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
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fields}>
              <Text t="h5" className={styles.text}>
                Offset the emissions generated by your flight to COP
                <br />
                and support projects that support the planet.
              </Text>

              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: 300 }}
                    id="name"
                    size="small"
                    type="text"
                    label="Your Name"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: 300 }}
                    id="email"
                    size="small"
                    type="email"
                    label="Your Email"
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: 300 }}
                    id="message"
                    size="small"
                    type="text"
                    label="Why are you offsetting?"
                  />
                )}
              />

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

            {/* <div ref={mapContainer} className={styles.mapbox} /> */}

            <div className={styles.stats}>
              <div>
                <b>Distance:</b> {distance.toFixed(2)} km
              </div>
              <div>
                <b>Carbon Estimate:</b> {estimate.toFixed(2)} tonnes
              </div>
              <div>
                <b>Offset Cost:</b> ${(price * estimate).toFixed(2)} USD
              </div>
            </div>

            <div className={styles.projectOptions}>
              {props.projects.map((p) => (
                <SimpleProjectCard
                  key={p.key}
                  project={p}
                  className={cx(styles.card, {
                    [styles.selectedCard]: p.key === project?.key,
                  })}
                  onClick={() => setProject(p)}
                />
              ))}
            </div>

            <ButtonPrimary
              disabled={isNil(project)}
              label={`Offset`}
              type="submit"
              className={styles.button}
            />
          </form>
        </div>
      </ThemeProvider>
    </>
  );
};

export default RetirementDemo;
