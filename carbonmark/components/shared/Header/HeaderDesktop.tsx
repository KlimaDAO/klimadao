import Link from "next/link";
import { FC, ReactNode } from "react";
import * as styles from "./styles";

import { CarbonmarkLogoFull } from "components/Logos/CarbonmarkLogoFull";
import { useRouter } from "next/router";
import { PageName } from "../Navigation";

interface Props {
  buttons?: JSX.Element[];
  href?: string;
  activePage: PageName;
  transparent?: boolean;
  children: ReactNode;
}

export const HeaderDesktop: FC<Props> = (props) => {
  const { pathname } = useRouter();
  return (
    <header
      className={
        props.transparent ||
        pathname === "/retirements/[beneficiary]/[retirement_index]"
          ? styles.headerTransparentDesktop
          : styles.headerDesktop
      }
    >
      <nav className={styles.menuDesktop}>
        <div className={styles.navMain_logo}>
          <Link href={"/"}>
            <CarbonmarkLogoFull />
            {/* <CarbonmarkLogo height="30" /> */}
          </Link>
        </div>
        <div className={styles.navMain_Desktop}>{props.children}</div>
        {props.buttons && (
          <div className={styles.navMain_Buttons}>{props.buttons}</div>
        )}
      </nav>
    </header>
  );
};
