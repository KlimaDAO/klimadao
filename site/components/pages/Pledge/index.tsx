import React, { useState } from "react";
import { NextPage } from "next";
import { useMoralis } from "react-moralis";
import dynamic from "next/dynamic";
import {
  KlimaInfinityLogo,
  Text,
  ButtonPrimary,
} from "@klimadao/lib/components";

import { Pledge as PledgeType } from "lib/moralis";
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

type Props = {
  pledge: PledgeType;
};

export const Pledge: NextPage<Props> = (props) => {
  const { isAuthenticated, authenticate, logout } = useMoralis();
  const [pledge, _setPledge] = useState<PledgeType>(props.pledge);

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
          <Text t="h4">
            {pledge?.name || pledge?.address || "Company name"}
          </Text>
        </div>

        <div className={styles.pledgeChart}>
          <AssetsOverTimeCard />
        </div>

        <div className={styles.column}>
          <PledgeCard pledge={pledge?.description} />
          <FootprintCard footprint={pledge?.footprint} />
          <MethodologyCard methodology={pledge?.methodology} />
        </div>

        <div className={styles.column}>
          <ActiveAssetsCard />
          <RetiredAssetsCard />
        </div>
      </div>
    </div>
  );
};
