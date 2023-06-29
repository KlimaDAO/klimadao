import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { HeaderDesktop } from "components/shared/Header/HeaderDesktop";
import { urls } from "lib/constants";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";
import { HeaderMobile } from "../Header/HeaderMobile";
import { LinkItemDesktop } from "./LinkItemDesktop";
import { NavItemMobile } from "./NavItemMobile";
import * as styles from "./styles";
// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export type PageName =
  | "Home"
  | "Projects"
  | "About"
  | "Portfolio"
  | "Login"
  | "Resources"
  | "Help";

export type NavItemMobileID =
  | "Profile"
  | "Portfolio"
  | "Marketplace"
  | "About"
  | "Help"
  | "Resources";

export type Props = {
  activePage: PageName;
  showThemeToggle?: boolean;
  transparent?: boolean;
};

export const Navigation: FC<Props> = ({
  activePage,
  transparent,
  showThemeToggle = false,
}) => {
  return (
    <>
      <HeaderDesktop
        transparent={transparent}
        buttons={[
          <ChangeLanguageButton key="ChangeLanguageButton" />,
          ...(showThemeToggle ? [<ThemeToggle key="ThemeToggle" />] : []),
          <ButtonPrimary
            key="Browse Projects"
            label={<Trans>Browse Projects</Trans>}
            href="/projects"
            className={styles.browseButton}
            renderLink={(linkProps) => <Link {...linkProps} />}
          />,
        ]}
        activePage={activePage}
      >
        <LinkItemDesktop
          name={t`Marketplace`}
          key="marketplace"
          url="/projects"
          active={activePage === "Projects"}
        />
        <LinkItemDesktop
          name={t`Profile`}
          key="profile"
          url="/users/login"
          active={activePage === "Login"}
        />
        <LinkItemDesktop
          name={t`Resources`}
          key="resources"
          url="/resources"
          active={activePage === "Resources"}
        />
        <LinkItemDesktop
          name={t`About`}
          key="about"
          url={urls.about}
          active={activePage === "About"}
        />
        <LinkItemDesktop
          name={t`Help`}
          key="help"
          url={urls.docs}
          active={activePage === "Help"}
        />
      </HeaderDesktop>

      <HeaderMobile
        buttons={[<ChangeLanguageButton key="ChangeLanguageButton" />]}
      >
        <div className={styles.navMain_MobileItemsWrapper}>
          <div className="links">
            <NavItemMobile
              name={t`Marketplace`}
              active={activePage === "Projects"}
              id="Marketplace"
              url="/projects"
            />
            <NavItemMobile
              name={t`Profile`}
              active={activePage === "Login"}
              id="Profile"
              url="/users/login"
            />
            <NavItemMobile
              name={t`Resources`}
              active={activePage === "Resources"}
              id="Resources"
              url="/resources"
            />
            <NavItemMobile
              name={t`About`}
              active={activePage === "About"}
              id="About"
              url={urls.about}
            />
            <NavItemMobile
              name={t`Help`}
              active={activePage === "Help"}
              id="Help"
              url={urls.docs}
            />
          </div>
          <div className="buttons">
            <ButtonPrimary
              key="Browse Projects"
              label={t`Browse Projects`}
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
