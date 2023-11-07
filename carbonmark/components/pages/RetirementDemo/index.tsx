import { cx } from "@emotion/css";
import {
  Autocomplete,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { FeatureCollection, LineString } from "@turf/helpers";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkLogoFull } from "components/Logos/CarbonmarkLogoFull";
import { PageHead } from "components/PageHead";
import { SimpleProjectCard } from "components/SimpleProjectCard";
import { NEXT_PUBLIC_MAPBOX_TOKEN } from "lib/constants";
import { Project } from "lib/types/carbonmark.types";
import { notNil } from "lib/utils/functional.utils";
import { isNil } from "lodash";
import mapboxgl, { Map } from "mapbox-gl";
import { NextPage } from "next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CITIES, KG_CARBON_KM_FLIGHT } from "./constants";
import * as styles from "./styles";
import { haversine } from "./utils";

export type PageProps = {
  projects: Project[];
};

type City = (typeof CITIES)[number];

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
  const [source, setSource] = useState<City>(CITIES[0]);
  const [destination, setDestination] = useState<City>(CITIES[1]);

  const estimate = (KG_CARBON_KM_FLIGHT * distance) / 1000;
  const price = Number(project?.price ?? 0);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (notNil(source) && notNil(destination)) {
      const distance = haversine(source.coordinates, destination.coordinates);

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

  useLayoutEffect(() => {
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
              [source?.coordinates.lng ?? 0, source?.coordinates.lat ?? 0],
              [
                destination?.coordinates.lng ?? 0,
                destination?.coordinates.lat ?? 0,
              ],
            ],
          },
          properties: {},
        },
      ],
    };

    if (mapRef?.getSource("route")) mapRef?.removeSource("route");
    if (mapRef?.getLayer("route")) mapRef?.removeLayer("route");

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
              <Autocomplete
                onChange={(event, val) => val && setSource(val)}
                size="small"
                id="from-city-select"
                options={CITIES}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="From" />}
              />
              <Autocomplete
                onChange={(event, val) => val && setDestination(val)}
                size="small"
                id="to-city-select"
                options={CITIES}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="To" />}
              />
            </div>

            <div ref={mapContainer} className={styles.mapbox} />

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
            <ButtonPrimary
              disabled={isNil(project)}
              key="Browse Projects"
              label={`Offset`}
              href="/projects"
              className={styles.button}
            />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};
