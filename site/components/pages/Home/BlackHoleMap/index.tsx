import { FC } from "react";
import Head from "next/head";
import Script from "next/script";
import { MapContainer, ImageOverlay, Polyline } from "react-leaflet";
import { CRS, LatLngBoundsLiteral, Map } from "leaflet";

import styles from "./index.module.css";

interface Props {
  onCreate: (m: Map) => void;
  onReady: () => void;
  initialView: [[number, number], number];
  polyline?: [number, number][];
}
const BlackHoleMap: FC<Props> = (props) => {
  const bounds: LatLngBoundsLiteral = [
    [0, 0],
    [720, 1440], // img dimensions
  ];

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <Script
        strategy="lazyOnload"
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossOrigin=""
      />
      <MapContainer
        crs={CRS.Simple}
        center={props.initialView[0]}
        zoom={props.initialView[1]}
        minZoom={-1}
        scrollWheelZoom={false}
        className={styles.mapContainer}
        maxBounds={bounds}
        maxBoundsViscosity={0.1}
        whenCreated={(m) => {
          props.onCreate(m);
        }}
        whenReady={props.onReady}
        zoomControl={false}
        attributionControl={false}
        zoomSnap={0.1}
      >
        {props.polyline && (
          <Polyline
            positions={props.polyline}
            pathOptions={{ color: "var(--primary)", weight: 2 }}
          />
        )}
        <ImageOverlay url="./black-hole-sun.png" bounds={bounds} />
      </MapContainer>
    </>
  );
};

export default BlackHoleMap;
