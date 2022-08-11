import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { t } from "@lingui/macro";
import { ButtonPrimary } from "@klimadao/lib/components";
import { useRouter } from "next/router";
import { createLinkWithLocaleQuery } from "lib/i18n";

import { urls } from "@klimadao/lib/constants";
import { HeaderDesktop } from "components/Header/HeaderDesktop";
import { NavItemDesktop } from "./NavItemDesktop";
import { NavItemMobile } from "./NavItemMobile";
import { HeaderMobile } from "../Header/HeaderMobile";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import * as styles from "./styles";
// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });
// these types should be the same?
type PageName = "Home" | "Buy" | "Resources" | "Disclaimer" | "Infinity";
export type NavItem =
  | "About"
  | "App"
  | "Infinity"
  | "Love Letters"
  | "Resources";
export type Props = {
  activePage: PageName;
  showThemeToggle?: boolean;
};

export const Navigation: FC<Props> = ({
  activePage,
  showThemeToggle = true,
}) => {
  const [selected, setSelected] = useState<NavItem | undefined>(undefined);
  const { locale } = useRouter();
  return (
    <>
      <HeaderDesktop
        buttons={[
          <ChangeLanguageButton key="ChangeLanguageButton" />,
          ...(showThemeToggle ? [<ThemeToggle key="ThemeToggle" />] : []),
          activePage !== "Infinity" ? (
            <ButtonPrimary
              key="Enter App"
              label={t({ message: "Enter App", id: "shared.enter_app" })}
              href={createLinkWithLocaleQuery(urls.app, locale)}
            />
          ) : (
            <ButtonPrimary
              key="Contact Sales"
              variant="blueRounded"
              label={t({
                message: "Contact Sales",
                id: "shared.contact_sales",
              })}
              href={urls.klimaInfinityContactForm}
              target="_blank"
            />
          ),
        ]}
        activePage={activePage}
      >
        <NavItemDesktop
          name={t({ message: "About", id: "shared.about" })}
          buttons={[
            <ButtonPrimary
              label="BLOG"
              key="blog"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="COMMUNITY"
              key="community"
              href="/community"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="CONTACT US"
              key="contact"
              href="/contact"
              className={styles.navMain_DesktopMenuItem}
            />,
          ]}
        />
        <NavItemDesktop
          name={t({ message: "App", id: "shared.app" })}
          buttons={[
            <ButtonPrimary
              label="BUY KLIMA"
              key="buy klima"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="STAKE KLIMA"
              key="stake"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="BOND CARBON"
              key="bond"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="WRAP SKLIMA"
              key="wrap"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="OFFSET"
              key="offset"
              href="/offset"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="INFO"
              key="info"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
          ]}
        />
        <NavItemDesktop
          name={t({ message: "Infinity", id: "shared.infity" })}
          active={activePage === "Infinity"}
          buttons={[
            <ButtonPrimary
              label="INTRODUCTION"
              key="intro"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="HOT TO PLEDGE"
              key="how pleadge"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="LEADER BOARD"
              key="leader board"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
          ]}
        />
        <NavItemDesktop
          url={urls.loveletter}
          name={t({ message: "Love Letters", id: "shared.loveletters" })}
        />
        <NavItemDesktop
          name={t({ message: "Resources", id: "shared.resources" })}
          active={activePage === "Resources"}
          buttons={[
            <ButtonPrimary
              label="HOW TO BUY KLIMA"
              key="how to buy"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="CARBON DASHBOARDS"
              key="carbon dashboards"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="DISCLAIMER"
              key="disclaimer"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
            <ButtonPrimary
              label="DOCS"
              key="docs"
              href="/blog"
              className={styles.navMain_DesktopMenuItem}
            />,
          ]}
        />
      </HeaderDesktop>

      <HeaderMobile
        buttons={[<ChangeLanguageButton key="ChangeLanguageButton" />]}
      >
        <div className={styles.navMain_MobileItemsWrapper}>
          <div className="links">
            <NavItemMobile
              url={createLinkWithLocaleQuery(urls.offset, locale)}
              name={t({ message: "About", id: "shared.about" })}
              selected={selected}
              setSelected={setSelected}
              id="About"
              buttons={[
                <ButtonPrimary
                  label="BLOG"
                  key="blog"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="COMMUNITY"
                  key="community"
                  href="/community"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="CONTACT US"
                  key="contact"
                  href="/contact"
                  className={styles.navMain_DesktopMenuItem}
                />,
              ]}
            />
            <NavItemMobile
              url="/infinity"
              name={t({ message: "App", id: "shared.app" })}
              selected={selected}
              setSelected={setSelected}
              id="App"
              buttons={[
                <ButtonPrimary
                  label="BUY KLIMA"
                  key="buy klima"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="STAKE KLIMA"
                  key="stake"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="BOND CARBON"
                  key="bond"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="WRAP SKLIMA"
                  key="wrap"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="OFFSET"
                  key="offset"
                  href="/offset"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="INFO"
                  key="info"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
              ]}
            />
            <NavItemMobile
              url={urls.loveletter}
              name={t({ message: "Infinity", id: "shared.infinity" })}
              selected={selected}
              setSelected={setSelected}
              id="Infinity"
              buttons={[
                <ButtonPrimary
                  label="INTRODUCTION"
                  key="intro"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="HOT TO PLEDGE"
                  key="how pleadge"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="LEADER BOARD"
                  key="leader board"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
              ]}
            />
            <NavItemMobile
              url="/blog"
              name={t({ message: "Love Letters", id: "shared.loveletters" })}
              selected={selected}
              setSelected={setSelected}
              id="Love Letters"
            />
            <NavItemMobile
              url="/blog"
              name={t({ message: "Resources", id: "shared.resources" })}
              selected={selected}
              setSelected={setSelected}
              id="Resources"
              buttons={[
                <ButtonPrimary
                  label="HOW TO BUY KLIMA"
                  key="how to buy"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="CARBON DASHBOARDS"
                  key="carbon dashboards"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="DISCLAIMER"
                  key="disclaimer"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
                <ButtonPrimary
                  label="DOCS"
                  key="docs"
                  href="/blog"
                  className={styles.navMain_DesktopMenuItem}
                />,
              ]}
            />
          </div>
          <div className="buttons">
            <ButtonPrimary
              label="Enter App"
              href="app.klimadao.finance"
              className={styles.navMain_MobileButton}
            />
            <ThemeToggle key="ThemeToggle" />
          </div>
        </div>
      </HeaderMobile>
    </>
  );
};
