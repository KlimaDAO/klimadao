import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { KlimaInfinityLogo } from "@klimadao/lib/components";

import {
  ActiveAssetsCard,
  AssetsOverTimeCard,
  FootprintCard,
  MethodologyCard,
  PledgeCard,
  RetiredAssetsCard,
} from "./Cards";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

export const Pledge: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <KlimaInfinityLogo />
          </div>
          <ThemeToggle />
        </div>

        <div className={styles.profile}></div>

        <div className={styles.pledgeChart}>
          <AssetsOverTimeCard />
        </div>

        <div className={styles.column}>
          <PledgeCard />
          <FootprintCard />
          <MethodologyCard />
        </div>

        <div className={styles.column}>
          <ActiveAssetsCard />
          <RetiredAssetsCard />
        </div>
      </div>
    </div>
  );
};
