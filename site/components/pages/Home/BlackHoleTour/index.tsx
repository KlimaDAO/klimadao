import { useState } from "react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import type { Map } from "leaflet";
import Image from "next/image";
import spaceForest from "public/space-forest.jpg";

import {
  IntersectDetector,
  TourItem,
  TourStartObserver,
  MAP_HEIGHT_VH,
} from "../TourItem";
import styles from "./index.module.css";

const LazyBlackHoleMap = dynamic(() => import("../BlackHoleMap"), {
  ssr: false,
});

// [[y,x], zoom]
const initialView: [[number, number], number] = [[350, 750], -1];

const BlackHoleTour = () => {
  const prevCenterRef = useRef(initialView[0]);
  const [polyline, setPolyline] = useState<[number, number][]>();
  const mapRef = useRef<Map | null>(null);

  const handleCreateMap = (m: Map) => {
    mapRef.current = m;
  };

  const handleMapReady = () => {};

  const handleIntersect =
    (viewArgs: [[number, number], number], newPolyline?: [number, number][]) =>
    () => {
      const [center, zoom] = viewArgs;
      if (
        center[0] !== prevCenterRef.current[0] ||
        center[1] !== prevCenterRef.current[1]
      ) {
        setPolyline(newPolyline);
        mapRef.current?.setView(center, zoom, { animate: true });
        prevCenterRef.current = center;
      }
    };

  return (
    <div className={styles.blackHoleSection}>
      <div className={styles.bgImgContainer}>
        <Image
          src={spaceForest}
          alt=""
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
      </div>
      <TourStartObserver onIntersect={handleIntersect(initialView)} />
      <div
        className={styles.stickyMapContainer}
        style={{ height: `${MAP_HEIGHT_VH}vh` }}
      >
        <LazyBlackHoleMap
          onCreate={handleCreateMap}
          onReady={handleMapReady}
          initialView={initialView}
          polyline={polyline}
        />
      </div>
      <IntersectDetector
        onIntersect={handleIntersect(
          [[351, 530], 0],
          [
            [380, 490],
            [380, 570],
            [300, 570],
            [300, 490],
            [380, 490],
          ]
        )}
      />
      <TourItem
        title="Klima Treasury"
        text="The treasury is the center of the black hole. Every KLIMA token is
          backed by 1 tonne of verified, tokenized carbon reduction or removal. These
          can remain locked in the treasury indefinitely, or sold to balance the price of KLIMA."
      />
      <IntersectDetector
        onIntersect={handleIntersect(
          [[455, 1115], -0.5],
          [
            [500, 1035],
            [500, 1115],
            [420, 1115],
            [420, 1035],
            [500, 1035],
          ]
        )}
      />
      <TourItem
        title="Carbon Credits"
        text="KLIMA is a vacuum for carbon. The treasury only accepts certified, third-party verified emissions
        reductions from reputable carbon markets (sometimes called 'carbon
        offsets' or 'carbon credits'). Each is tokenized in a
        transparent and traceable way to prevent double-spending or
        double-offsetting. These credits are sucked off the market and
        absorbed into the system through a Bonding mechanism."
      />
      <IntersectDetector
        onIntersect={handleIntersect(
          [[436, 796], 0.2],
          [
            [450, 720],
            [450, 760],
            [410, 760],
            [410, 720],
            [450, 720],
          ]
        )}
      />
      <TourItem
        title="Bonding"
        text="Bonding is how carbon enters the treasury, and new KLIMA is created. Anyone can buy KLIMA at a discount by bonding carbon units and LP shares over a set vesting period."
      />
      <IntersectDetector
        onIntersect={handleIntersect(
          [[470, 540], 0.3],
          [
            [470, 510],
            [470, 540],
            [440, 540],
            [440, 510],
            [470, 510],
          ]
        )}
      />
      <TourItem
        title="Staking"
        text="Carbon comes in, value comes out.
        Holders of KLIMA can earn compounding interest on their KLIMA by
        staking. Staking encourages long-term holding of KLIMA, and
        allows participants to benefit from the rising price of carbon. As the
        protocol generates a profit through Bond sales, this profit is
        allocated to everyone who has staked KLIMA."
      />
      <IntersectDetector onIntersect={handleIntersect(initialView)} />
      <div className={styles.gap} />
    </div>
  );
};

export default BlackHoleTour;
