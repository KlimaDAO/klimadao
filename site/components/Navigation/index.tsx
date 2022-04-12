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

type PageName = "Home" | "Buy" | "Resources" | "Disclaimer";

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
          label={t({ message: "Enter App", id: "shared.enter_app" })}
          href={urls.app}
        />,
      ])}
    >
      <NavItemDesktop
        url={"/buy"}
        name={t({ message: "Buy", id: "shared.buy" })}
        active={props.activePage === "Buy"}
      />
      <NavItemDesktop
        url={urls.stake}
        name={t({ message: "Stake", id: "shared.stake" })}
      />
      <NavItemDesktop
        url={urls.loveletter}
        name={t({ message: "Love Letters", id: "shared.loveletters" })}
      />
      <NavItemDesktop
        url="/blog"
        name={t({ message: "Resources", id: "shared.resources" })}
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
        name={t({ message: "Buy", id: "shared.buy" })}
      />
      <NavItemMobile
        url={urls.stake}
        name={t({ message: "Stake", id: "shared.stake" })}
      />
      <NavItemMobile
        url={urls.bonds}
        name={t({ message: "Love Letters", id: "shared.loveletters" })}
      />
      <NavItemMobile
        url="/blog"
        name={t({ message: "Resources", id: "shared.resources" })}
      />
    </HeaderMobile>
  </>
);
