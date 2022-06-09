import React, { FC } from "react";
import dynamic from "next/dynamic";
import { KlimaInfinityLogoOnly } from "@klimadao/lib/components";

import Link from "next/link";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

interface Props {
  buttons?: JSX.Element[];
}

export const HeaderMobile: FC<Props> = (props) => {
  return (
    <div className={styles.headerMobileWrap}>
      <header className={styles.headerMobile}>
        <div className={styles.mainLogoMobile}>
          <Link href={"/pledge"}>
            <a>
              <KlimaInfinityLogoOnly />
            </a>
          </Link>
          <div className={styles.betaBadge}>Beta</div>
        </div>

        <div className={styles.navMain_Buttons}>
          <ThemeToggle className={styles.themeToggle} />
          {props.buttons && props.buttons}
        </div>
      </header>
    </div>
  );
};
