import { FC } from "react";
import dynamic from "next/dynamic";
import { t } from "@lingui/macro";
import { ButtonPrimary } from "@klimadao/lib/components";
import { useRouter } from "next/router";
import { createLinkWithLocaleQuery } from "lib/i18n";

import { urls } from "@klimadao/lib/constants";
import { HeaderDesktop } from "components/Header/HeaderDesktop";
import { LinkItemDesktop } from "./LinkItemDesktop";
import { DropdownItemDesktop } from "./DropdownItemDesktop";
import { NavItemMobile } from "./NavItemMobile";
import { HeaderMobile } from "../Header/HeaderMobile";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import * as styles from "./styles";
// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export type PageName =
  | "Home"
  | "Buy"
  | "Resources"
  | "Disclaimer"
  | "Infinity"
  | "Community"
  | "Contact"
  | "Pledges"
  | "EventDemo"
  | "Updates"
  | "About";

export type NavItemMobileID =
  | "About"
  | "App"
  | "Infinity"
  | "Love Letters"
  | "Resources";

export type Props = {
  activePage: PageName;
  showThemeToggle?: boolean;
  transparent?: boolean;
};

export const Navigation: FC<Props> = ({
  activePage,
  transparent,
  showThemeToggle = true,
}) => {
  const { locale } = useRouter();

  return (
    <>
      <HeaderDesktop
        transparent={transparent}
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
              variant="blue"
              rounded
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
        <DropdownItemDesktop
          name={t({ message: "About", id: "shared.about" })}
          active={activePage === "About"}
        >
          <LinkItemDesktop
            name={t({
              message: "Community",
              id: "shared.community",
            })}
            key="community"
            url="/community"
            active={activePage === "Community"}
          />
          <LinkItemDesktop
            name={t({
              message: "Contact Us",
              id: "shared.contact_us",
            })}
            key="contact"
            active={activePage === "Contact"}
            url="/contact"
          />
          <LinkItemDesktop
            name={t({
              message: "Disclaimer",
              id: "shared.disclaimer",
            })}
            key="disclaimer"
            active={activePage === "Disclaimer"}
            url="/disclaimer"
          />
        </DropdownItemDesktop>

        <DropdownItemDesktop name={t({ message: "App", id: "shared.app" })}>
          <LinkItemDesktop
            name={t({
              message: "Buy Klima",
              id: "shared.buy",
            })}
            key="buy klima"
            url={createLinkWithLocaleQuery(urls.buy, locale)}
          />
          <LinkItemDesktop
            name={t({
              message: "Stake Klima",
              id: "shared.stake",
            })}
            key="stake"
            url={createLinkWithLocaleQuery(urls.stake, locale)}
          />
          <LinkItemDesktop
            name={t({
              message: "Bond Klima",
              id: "shared.bond",
            })}
            key="bond"
            url={createLinkWithLocaleQuery(urls.bonds, locale)}
          />
          <LinkItemDesktop
            name={t({
              message: "Wrap sKlima",
              id: "shared.wrap",
            })}
            key="wrap"
            url={createLinkWithLocaleQuery(urls.wrap, locale)}
          />
          <LinkItemDesktop
            name={t({
              message: "Offset",
              id: "shared.offset",
            })}
            key="offset"
            url={createLinkWithLocaleQuery(urls.offset, locale)}
          />
          <LinkItemDesktop
            name={t({
              message: "Info",
              id: "shared.info",
            })}
            key="info"
            url={createLinkWithLocaleQuery(urls.info, locale)}
          />
        </DropdownItemDesktop>
        <DropdownItemDesktop
          name={t({ message: "Infinity", id: "shared.infinity" })}
        >
          <LinkItemDesktop
            name={t({ message: "Introduction", id: "shared.infinity_intro" })}
            active={activePage === "Infinity"}
            url="/infinity"
          />
          <LinkItemDesktop
            name={t({ message: "How to pledge", id: "shared.pledge" })}
            active={activePage === "Pledges"}
            url="/pledge"
          />
        </DropdownItemDesktop>
        <LinkItemDesktop
          url={urls.loveletter}
          name={t({ message: "Love Letters", id: "shared.loveletters" })}
        />
        <DropdownItemDesktop
          name={t({ message: "Resources", id: "shared.resources" })}
        >
          <LinkItemDesktop
            name={t({
              message: "Updates",
              id: "shared.updates",
            })}
            key="updates"
            url="/resources"
            active={activePage === "Updates"}
          />
          <LinkItemDesktop
            name={t({
              message: "How To Buy Klima",
              id: "shared.how_to_buy",
            })}
            key="how to buy"
            active={activePage === "Buy"}
            url="/buy"
          />
          <LinkItemDesktop
            name={t({
              message: "Carbon Dashboards",
              id: "shared.carbon_dashboards",
            })}
            key="carbon dashboards"
            url={urls.carbonDashboard}
          />
          <LinkItemDesktop
            name={t({
              message: "Official Docs",
              id: "shared.docs",
            })}
            key="docs"
            url={urls.officialDocs}
          />
        </DropdownItemDesktop>
      </HeaderDesktop>

      <HeaderMobile
        buttons={[<ChangeLanguageButton key="ChangeLanguageButton" />]}
      >
        <div className={styles.navMain_MobileItemsWrapper}>
          <div className="links">
            <NavItemMobile
              name={t({ message: "About", id: "shared.about" })}
              active={activePage === "About"}
              id="About"
              subMenu={[
                <NavItemMobile
                  name={t({
                    message: "Community",
                    id: "shared.community",
                  })}
                  key="community"
                  active={activePage === "Community"}
                  url="/community"
                />,
                <NavItemMobile
                  name={t({
                    message: "Contact Us",
                    id: "shared.contact",
                  })}
                  key="contact"
                  active={activePage === "Contact"}
                  url="/contact"
                />,
                <NavItemMobile
                  name={t({
                    message: "Disclaimer",
                    id: "shared.disclaimer",
                  })}
                  key="disclaimer"
                  active={activePage === "Disclaimer"}
                  url="/disclaimer"
                />,
              ]}
            />
            <NavItemMobile
              name={t({ message: "App", id: "shared.app" })}
              id="App"
              subMenu={[
                <NavItemMobile
                  name={t({ message: "Buy Klima", id: "shared.buy" })}
                  key="buy klima"
                  url="/buy"
                />,
                <NavItemMobile
                  name={t({
                    message: "Stake Klima",
                    id: "shared.stake",
                  })}
                  key="stake"
                  url={createLinkWithLocaleQuery(urls.stake, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "Bond Klima",
                    id: "shared.bond",
                  })}
                  key="bond"
                  url={createLinkWithLocaleQuery(urls.bonds, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "Wrap sKlima",
                    id: "shared.wrap",
                  })}
                  key="wrap"
                  url={createLinkWithLocaleQuery(urls.wrap, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "Offset",
                    id: "shared.offset",
                  })}
                  key="offset"
                  url={createLinkWithLocaleQuery(urls.offset, locale)}
                />,
                <NavItemMobile
                  name={t({
                    message: "Info",
                    id: "shared.info",
                  })}
                  key="info"
                  url={createLinkWithLocaleQuery(urls.info, locale)}
                />,
              ]}
            />

            <NavItemMobile
              name={t({ message: "Infinity", id: "shared.infinity" })}
              subMenu={[
                <NavItemMobile
                  name={t({
                    message: "Introduction",
                    id: "shared.infinity_intro",
                  })}
                  key="infinity"
                  url="/infinity"
                />,
                <NavItemMobile
                  name={t({ message: "How to pledge", id: "shared.pledge" })}
                  key="pledges"
                  url="/pledge"
                />,
              ]}
            />
            <NavItemMobile
              name={t({ message: "Love Letters", id: "shared.loveletters" })}
              id="Love Letters"
              url={urls.loveletter}
            />
            <NavItemMobile
              name={t({ message: "Resources", id: "shared.resources" })}
              id="Resources"
              subMenu={[
                <NavItemMobile
                  name={t({
                    message: "Updates",
                    id: "shared.updates",
                  })}
                  key="updates"
                  url="/resources"
                  active={activePage === "Updates"}
                />,
                <NavItemMobile
                  name={t({
                    message: "How To Buy Klima",
                    id: "shared.how_to_buy",
                  })}
                  active={activePage === "Buy"}
                  key="how to buy"
                  url="/buy"
                />,
                <NavItemMobile
                  name={t({
                    message: "Carbon Dashboard",
                    id: "shared.carbon_dashboard",
                  })}
                  key="carbon dashboards"
                  url={urls.carbonDashboard}
                />,
                <NavItemMobile
                  name={t({
                    message: "Official Docs",
                    id: "shared.docs",
                  })}
                  key="docs"
                  url={urls.officialDocs}
                />,
              ]}
            />
          </div>
          <div className="buttons">
            <ButtonPrimary
              label="Enter App"
              href={createLinkWithLocaleQuery(urls.app, locale)}
              className={styles.navMain_MobileButton}
            />
            {showThemeToggle && <ThemeToggle />}
          </div>
        </div>
      </HeaderMobile>
    </>
  );
};
