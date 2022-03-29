import React from "react";
import { NextPage } from "next";
import { useMoralis } from "react-moralis";
import dynamic from "next/dynamic";
import {
  KlimaInfinityLogo,
  Text,
  ButtonPrimary,
} from "@klimadao/lib/components";

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
  const { isAuthenticated, authenticate, logout } = useMoralis();

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <KlimaInfinityLogo />
          </div>
          <div className={styles.group}>
            <ThemeToggle />
            {isAuthenticated ? (
              <ButtonPrimary label="Sign out" onClick={() => logout()} />
            ) : (
              <ButtonPrimary label="Sign in" onClick={() => authenticate()} />
            )}
          </div>
        </div>

        <div className={styles.profile}>
          <Text t="h3" className="profileImage" align="center">
            -
          </Text>
          <Text t="h4">Company name</Text>
        </div>

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
