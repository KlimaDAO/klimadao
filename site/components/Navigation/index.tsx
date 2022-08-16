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
type PageName = "Home" | "Buy" | "Resources" | "Disclaimer" | "Infinity";
export type NavItemMobileID =
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
  const [toggledNavItemID, setToggledNavItemID] = useState<
    NavItemMobileID | undefined
  >(undefined);
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
          subMenu={[
            <NavItemDesktop
              name={t({
                message: "BLOG",
                id: "shared.blog",
              })}
              key="blog"
              href="/blog"
            />,
            <NavItemDesktop
              name={t({
                message: "COMMUNITY",
                id: "shared.community",
              })}
              key="community"
              href="/community"
            />,
            <NavItemDesktop
              name={t({
                message: "CONTACT US",
                id: "shared.contact",
              })}
              key="contact"
              href="/contact"
            />,
          ]}
        />
        <NavItemDesktop
          name={t({ message: "App", id: "shared.app" })}
          subMenu={[
            <NavItemDesktop
              name={t({
                message: "BUY KLIMA",
                id: "shared.buy",
              })}
              key="buy klima"
              href={createLinkWithLocaleQuery(urls.buy, locale)}
            />,
            <NavItemDesktop
              name={t({
                message: "STAKE KLIMA",
                id: "shared.stake",
              })}
              key="stake"
              href={createLinkWithLocaleQuery(urls.stake, locale)}
            />,
            <NavItemDesktop
              name={t({
                message: "BOND KLIMA",
                id: "shared.bond",
              })}
              key="bond"
              href={createLinkWithLocaleQuery(urls.bonds, locale)}
            />,
            <NavItemDesktop
              name={t({
                message: "WRAP SKLIMA",
                id: "shared.wrap",
              })}
              key="wrap"
              href={createLinkWithLocaleQuery(urls.wrap, locale)}
            />,
            <NavItemDesktop
              name={t({
                message: "OFFSET",
                id: "shared.offset",
              })}
              key="offset"
              href={createLinkWithLocaleQuery(urls.offset, locale)}
            />,
            <NavItemDesktop
              name={t({
                message: "INFO",
                id: "shared.info",
              })}
              key="info"
              href={createLinkWithLocaleQuery(urls.info, locale)}
            />,
          ]}
        />
        <NavItemDesktop
          name={t({ message: "Infinity", id: "shared.infity" })}
          active={activePage === "Infinity"}
          subMenu={[
            <NavItemDesktop
              name={t({
                message: "INTRODUCTION",
                id: "shared.intoduction",
              })}
              key="intro"
              href="/infinity"
            />,
            // these can be uncommented with resources page reqork
            // <NavItemDesktop
            //   label={t({
            //     message: "HOW TO PLEDGE",
            //     id: "shared.how_to_pledge",
            //   })}
            //   key="how pledge"
            //   href="/blog"
            //   className={styles.navMain_DesktopMenuItem}
            // />,
            // <NavItemDesktop
            // label={t({
            //   message: "LEADER BOARD",
            //   id: "shared.leader_board",
            // })}
            //   key="leader board"
            //   href="/blog"
            //   className={styles.navMain_DesktopMenuItem}
            // />,
          ]}
        />
        <NavItemDesktop
          url={urls.loveletter}
          name={t({ message: "Love Letters", id: "shared.loveletters" })}
        />
        <NavItemDesktop
          name={t({ message: "Resources", id: "shared.resources" })}
          active={activePage === "Resources"}
          subMenu={[
            <NavItemDesktop
              name={t({
                message: "HOW TO BUY KLIMA",
                id: "shared.how_to_buy",
              })}
              key="how to buy"
              href="/blog"
            />,
            <NavItemDesktop
              name={t({
                message: "CARBON DASHBOARDS",
                id: "shared.carbon_dashboards",
              })}
              key="carbon dashboards"
              href="/blog"
            />,
            <NavItemDesktop
              name={t({
                message: "DISCLAIMER",
                id: "shared.disclaimer",
              })}
              key="disclaimer"
              href="/disclaimer"
            />,
            <NavItemDesktop
              name={t({
                message: "DOCS",
                id: "shared.docs",
              })}
              key="docs"
              href={urls.officialDocs}
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
              name={t({ message: "About", id: "shared.about" })}
              toggledNavItemID={toggledNavItemID}
              setToggledNavItemID={setToggledNavItemID}
              id="About"
              subMenu={[
                <NavItemMobile
                  name={t({
                    message: "BLOG",
                    id: "shared.blog",
                  })}
                  key="blog"
                  href="/blog"
                />,
                <NavItemMobile
                  name={t({
                    message: "COMMUNITY",
                    id: "shared.community",
                  })}
                  key="community"
                  href="/community"
                />,
                <NavItemMobile
                  name={t({
                    message: "CONTACT US",
                    id: "shared.contact",
                  })}
                  key="contact"
                  href="/contact"
                />,
              ]}
            />
            <NavItemMobile
              name={t({ message: "App", id: "shared.app" })}
              toggledNavItemID={toggledNavItemID}
              setToggledNavItemID={setToggledNavItemID}
              id="App"
              subMenu={[
                <NavItemMobile
                  name={t({ message: "BUY KLIMA", id: "shared.buy" })}
                  key="buy klima"
                  href={createLinkWithLocaleQuery(urls.buy, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "STAKE KLIMA",
                    id: "shared.stake",
                  })}
                  key="stake"
                  href={createLinkWithLocaleQuery(urls.stake, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "BOND KLIMA",
                    id: "shared.bond",
                  })}
                  key="bond"
                  href={createLinkWithLocaleQuery(urls.bonds, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "WRAP SKLIMA",
                    id: "shared.wrap",
                  })}
                  key="wrap"
                  href={createLinkWithLocaleQuery(urls.wrap, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "OFFSET",
                    id: "shared.offset",
                  })}
                  key="offset"
                  href={createLinkWithLocaleQuery(urls.offset, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "INFO",
                    id: "shared.info",
                  })}
                  key="info"
                  href={createLinkWithLocaleQuery(urls.info, locale)}
                />,
              ]}
            />
            <NavItemMobile
              name={t({ message: "Infinity", id: "shared.infinity" })}
              toggledNavItemID={toggledNavItemID}
              setToggledNavItemID={setToggledNavItemID}
              id="Infinity"
              subMenu={[
                <NavItemMobile
                  name={t({
                    message: "INTRODUCTION",
                    id: "shared.intoduction",
                  })}
                  key="intro"
                  href="/blog"
                />,
                <NavItemMobile
                  name={t({
                    message: "HOW TO PLEDGE",
                    id: "shared.how_to_pledge",
                  })}
                  key="how pleadge"
                  href="/blog"
                />,
                <NavItemMobile
                  name={t({
                    message: "LEADER BOARD",
                    id: "shared.leader_board",
                  })}
                  key="leader board"
                  href="/blog"
                />,
              ]}
            />
            <NavItemMobile
              name={t({ message: "Love Letters", id: "shared.loveletters" })}
              toggledNavItemID={toggledNavItemID}
              setToggledNavItemID={setToggledNavItemID}
              id="Love Letters"
            />
            <NavItemMobile
              name={t({ message: "Resources", id: "shared.resources" })}
              toggledNavItemID={toggledNavItemID}
              setToggledNavItemID={setToggledNavItemID}
              id="Resources"
              subMenu={[
                <NavItemMobile
                  name={t({
                    message: "HOW TO BUY KLIMA",
                    id: "shared.how_to_buy",
                  })}
                  key="how to buy"
                  href="/blog"
                />,
                <NavItemMobile
                  name={t({
                    message: "CARBON DASHBOARDS",
                    id: "shared.carbon_dashboards",
                  })}
                  key="carbon dashboards"
                  href="/blog"
                />,
                <NavItemMobile
                  name={t({
                    message: "DISCLAIMER",
                    id: "shared.disclaimer",
                  })}
                  key="disclaimer"
                  href="/blog"
                />,
                <NavItemMobile
                  name={t({
                    message: "DOCS",
                    id: "shared.docs",
                  })}
                  key="docs"
                  href="/blog"
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
