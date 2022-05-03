import React, { FC } from "react";
import { useMoralis } from "react-moralis";
import dynamic from "next/dynamic";
import { KlimaInfinityLogo, ButtonPrimary } from "@klimadao/lib/components";

import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  buttons?: JSX.Element[];
};

export const PledgeLayout: FC<Props> = (props) => {
  const { isAuthenticated, authenticate, logout } = useMoralis();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <KlimaInfinityLogo />
          </div>
          <div className={styles.group}>
            <ThemeToggle />

            {props.buttons && props.buttons}

            {isAuthenticated ? (
              <ButtonPrimary label="Sign out" onClick={() => logout()} />
            ) : (
              <ButtonPrimary label="Sign in" onClick={() => authenticate()} />
            )}
          </div>
        </div>
      </div>

      <>{props.children}</>
    </div>
  );
};
