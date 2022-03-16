import { FC } from "react";
import dynamic from "next/dynamic";
import { t } from "@lingui/macro";
import { ButtonPrimary } from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";
import { HeaderDesktop } from "components/Header/HeaderDesktop";
import { NavItemDesktop } from "./NavItemDesktop";
import { NavItemMobile } from "./NavItemMobile";
import { HeaderMobile } from "../Header/HeaderMobile";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { IS_PRODUCTION } from "lib/constants";
// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

type PageName = "Home" | "Get KLIMA" | "Resources" | "Disclaimer";

export type Props = {
  activePage: PageName;
};

export const Navigation: FC<Props> = (props) => (
  <>
    <HeaderDesktop
      buttons={(!IS_PRODUCTION
        ? [<ChangeLanguageButton key="ChangeLanguageButton" />]
        : []
      ).concat([
        <ThemeToggle key="ThemeToggle" />,
        <ButtonPrimary
          key="Enter App"
          label={t({ message: "Enter App", id: "mainNav.enter_app" })}
          href={urls.app}
        />,
      ])}
    >
      <NavItemDesktop
        url={"/buy"}
        name={t({ message: "Get KLIMA", id: "mainNav.get_klima" })}
        active={props.activePage === "Get KLIMA"}
      />
      <NavItemDesktop
        url={urls.stake}
        name={t({ message: "Stake", id: "mainNav.stake" })}
      />
      <NavItemDesktop
        url={urls.bonds}
        name={t({ message: "Bond", id: "mainNav.bond" })}
      />
      <NavItemDesktop
        url="/blog"
        name={t({ message: "Resources", id: "mainNav.resources" })}
        active={props.activePage === "Resources"}
      />
    </HeaderDesktop>

    <HeaderMobile
      buttons={(!IS_PRODUCTION
        ? [<ChangeLanguageButton key="ChangeLanguageButton" />]
        : []
      ).concat([<ThemeToggle key="ThemeToggle" />])}
    >
      <NavItemMobile
        url="/buy"
        name={t({ message: "Get KLIMA", id: "mainNav.get_klima" })}
      />
      <NavItemMobile
        url={urls.stake}
        name={t({ message: "Stake", id: "mainNav.stake" })}
      />
      <NavItemMobile
        url={urls.bonds}
        name={t({ message: "Bond", id: "mainNav.bond" })}
      />
      <NavItemMobile
        url="/blog"
        name={t({ message: "Resources", id: "mainNav.resources" })}
      />
    </HeaderMobile>
  </>
);
