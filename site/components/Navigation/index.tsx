import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC } from "react";

import { urls } from "@klimadao/lib/constants";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { HeaderDesktop } from "components/Header/HeaderDesktop";
import { HeaderMobile } from "../Header/HeaderMobile";
import { DropdownItemDesktop } from "./DropdownItemDesktop";
import { LinkItemDesktop } from "./LinkItemDesktop";
import { NavItemMobile } from "./NavItemMobile";
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
  | "Resource Center"
  | "About";

export type NavItemMobileID = "About" | "App" | "Infinity" | "Resources";

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
              href={urls.app}
            />
          ) : (
            <ButtonPrimary
              key="Contact Sales"
              variant="blue"
              shape="rounded"
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
          <LinkItemDesktop name={t`Buy Klima`} key="buy klima" url={urls.buy} />
          <LinkItemDesktop name={t`Stake Klima`} key="stake" url={urls.stake} />
          <LinkItemDesktop name={t`Bond Klima`} key="bond" url={urls.bonds} />
          <LinkItemDesktop
            name={t({
              message: "Wrap sKlima",
              id: "shared.wrap",
            })}
            key="wrap"
            url={urls.wrap}
          />
          <LinkItemDesktop
            name={t({
              message: "Offset",
              id: "shared.offset",
            })}
            key="offset"
            url={urls.offset}
          />
          <LinkItemDesktop
            name={t({
              message: "Buy Carbon",
              id: "shared.buy_carbon",
            })}
            key="buy carbon"
            url={urls.redeem}
          />
          <LinkItemDesktop
            name={t({
              message: "Info",
              id: "shared.info",
            })}
            key="info"
            url={urls.info}
          />
        </DropdownItemDesktop>
        <LinkItemDesktop
          name={t({ message: "Carbonmark", id: "shared.carbonmark" })}
          url={urls.carbonmark}
        />
        <DropdownItemDesktop
          name={t({ message: "Resources", id: "shared.resources" })}
        >
          <LinkItemDesktop
            name={t({
              message: "Resource Center",
              id: "shared.resourcecenter",
            })}
            key="resourcecenter"
            url="/resources"
            active={activePage === "Resource Center"}
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
            name={t`Official Docs`}
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
                  name={t`Contact Us`}
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
                  name={t`Stake Klima`}
                  key="stake"
                  url={urls.stake}
                />,
                <NavItemMobile
                  name={t`Bond Klima`}
                  key="bond"
                  url={urls.bonds}
                />,
                <NavItemMobile
                  name={t({
                    message: "Wrap sKlima",
                    id: "shared.wrap",
                  })}
                  key="wrap"
                  url={urls.wrap}
                />,
                <NavItemMobile
                  name={t({
                    message: "Offset",
                    id: "shared.offset",
                  })}
                  key="offset"
                  url={urls.offset}
                />,
                <NavItemMobile
                  name={t({
                    message: "Buy Carbon",
                    id: "shared.buy_carbon",
                  })}
                  key="buy carbon"
                  url={urls.redeem}
                />,
                <NavItemMobile
                  name={t({
                    message: "Info",
                    id: "shared.info",
                  })}
                  key="info"
                  url={urls.info}
                />,
              ]}
            />

            <NavItemMobile
              name={t({ message: "Carbonmark", id: "shared.carbonmark" })}
              url={urls.carbonmark}
            />
            <NavItemMobile
              name={t({ message: "Resources", id: "shared.resources" })}
              id="Resources"
              subMenu={[
                <NavItemMobile
                  name={t({
                    message: "Resource Center",
                    id: "shared.resourcecenter",
                  })}
                  key="resourcecenter"
                  url="/resources"
                  active={activePage === "Resource Center"}
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
                  name={t`Official Docs`}
                  key="docs"
                  url={urls.officialDocs}
                />,
              ]}
            />
          </div>
          <div className="buttons">
            <ButtonPrimary
              label="Enter App"
              href={urls.app}
              className={styles.navMain_MobileButton}
            />
            {showThemeToggle && <ThemeToggle />}
          </div>
        </div>
      </HeaderMobile>
    </>
  );
};
