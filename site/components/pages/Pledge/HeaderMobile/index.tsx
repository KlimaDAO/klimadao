import React, { FC } from "react";
import * as styles from "./styles";

import { KlimaInfinityLogoOnly } from "@klimadao/lib/components";
import Link from "next/link";

interface Props {
  buttons?: JSX.Element[];
}

export const HeaderMobile: FC<Props> = (props) => {
  return (
    <div className={styles.headerMobileWrap}>
      <header className={styles.headerMobile}>
        <div className={styles.mainLogoMobile}>
          <Link href={"/"}>
            <a>
              <KlimaInfinityLogoOnly />
            </a>
          </Link>
        </div>

        {props.buttons && (
          <div className={styles.navMain_Buttons}>{props.buttons}</div>
        )}
      </header>
    </div>
  );
};
