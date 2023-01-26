import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import dynamic from "next/dynamic";
import Link from "next/link";

import { FC } from "react";

import { HeaderDesktop } from "components/Header/HeaderDesktop";
import { ChangeLanguageButton } from "components/shared/ChangeLanguageButton";
import { HeaderMobile } from "../Header/HeaderMobile";
import { LinkItemDesktop } from "./LinkItemDesktop";
import { NavItemMobile } from "./NavItemMobile";
import * as styles from "./styles";
// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export type PageName = "Projects" | "Portfolio" | "Login" | "Resources";

export type NavItemMobileID =
  | "Profile"
  | "Portfolio"
  | "Marketplace"
  | "Resources";

export type Props = {
  activePage: PageName;
  showThemeToggle?: boolean;
  transparent?: boolean;
};

export const Navigation: FC<Props> = ({
  activePage,
  transparent,
  showThemeToggle,
}) => {
  return (
    <>
      <HeaderDesktop
        transparent={transparent}
        buttons={[
          <ChangeLanguageButton key="ChangeLanguageButton" />,
          ...(showThemeToggle ? [<ThemeToggle key="ThemeToggle" />] : []),
          <ButtonPrimary
            key="Enter App"
            label={t({ message: "Enter App", id: "shared.enter_app" })}
            href="/projects"
            renderLink={(linkProps) => <Link {...linkProps} />}
          />,
        ]}
        activePage={activePage}
      >
        <LinkItemDesktop
          name={t({
            message: "Marketplace",
            id: "shared.resourcecenter",
          })}
          key="marketplace"
          url="/projects"
          active={activePage === "Projects"}
        />
        <LinkItemDesktop
          name={t({
            message: "Profile",
            id: "shared.resourcecenter",
          })}
          key="profile"
          url="/users/login"
          active={activePage === "Login"}
        />
        <LinkItemDesktop
          name={t({
            message: "Portfolio",
            id: "shared.resourcecenter",
          })}
          key="portfolio"
          url="/portfolio"
          active={activePage === "Portfolio"}
        />
        <LinkItemDesktop
          name={t({
            message: "Resources",
            id: "shared.resourcecenter",
          })}
          key="resources"
          url="/resources"
          active={activePage === "Resources"}
        />
      </HeaderDesktop>

      <HeaderMobile
        buttons={[<ChangeLanguageButton key="ChangeLanguageButton" />]}
      >
        <div className={styles.navMain_MobileItemsWrapper}>
          <div className="links">
            <NavItemMobile
              name={t({ message: "Marketplace", id: "shared.about" })}
              active={activePage === "Projects"}
              id="Marketplace"
              url="/projects"
            />
            <NavItemMobile
              name={t({ message: "Profile", id: "shared.about" })}
              active={activePage === "Login"}
              id="Profile"
              url="/users/login"
            />

            <NavItemMobile
              name={t({ message: "Portfolio", id: "shared.about" })}
              active={activePage === "Portfolio"}
              id="Portfolio"
              url="/portfolio"
            />
            <NavItemMobile
              name={t({ message: "Resources", id: "shared.about" })}
              active={activePage === "Resources"}
              id="Resources"
              url="/resources"
            />
          </div>
          <div className="buttons">
            <ButtonPrimary
              key="Enter App"
              label={t({ message: "Enter App", id: "shared.enter_app" })}
              href="/projects"
              renderLink={(linkProps) => <Link {...linkProps} />}
              className={styles.navMain_MobileButton}
            />
            {showThemeToggle && <ThemeToggle />}
          </div>
        </div>
      </HeaderMobile>
    </>
  );
};
