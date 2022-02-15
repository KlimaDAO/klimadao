import { FC } from "react";
import dynamic from "next/dynamic";
import { t } from "@lingui/macro";
import { ButtonPrimary } from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";
import { HeaderDesktop } from "components/Header/HeaderDesktop";
import { NavItemDesktop } from "./NavItemDesktop";
import { NavItemMobile } from "./NavItemMobile";
import { HeaderMobile } from "../Header/HeaderMobile";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

type PageName = "Home" | "Get KLIMA" | "Resources";

export type Props = {
  activePage: PageName;
};

export const Navigation: FC<Props> = (props) => {
  return (
    <>
      <HeaderDesktop
        buttons={[
          <ThemeToggle key="ThemeToggle" />,
          <ButtonPrimary
            key="Enter App"
            label={t`Enter App`}
            href={urls.app}
            target="_blank"
            rel="noopener noreferrer"
          />,
        ]}
      >
        <NavItemDesktop
          url={"/"}
          name={t({ message: "Home", id: "mainNav.home" })}
          active={props.activePage === "Home"}
        />
        <NavItemDesktop
          url={"/buy"}
          name={t`Get KLIMA`}
          active={props.activePage === "Get KLIMA"}
        />
        <NavItemDesktop
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
          target="_blank"
          rel="noopener noreferrer"
        />
        <NavItemDesktop
          url={urls.bonds}
          name={t({ message: "Bond", id: "mainNav.bond" })}
          target="_blank"
          rel="noopener noreferrer"
        />
        <NavItemDesktop
          url="/blog"
          name={t`Resources`}
          active={props.activePage === "Resources"}
        />
      </HeaderDesktop>
      <HeaderMobile buttons={[<ThemeToggle key="ThemeToggle" />]}>
        <NavItemMobile
          url={"/"}
          name={t({ message: "Home", id: "mainNav.home" })}
        />
        <NavItemMobile url="/buy" name={t`Get KLIMA`} />
        <NavItemMobile
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
          target="_blank"
          rel="noopener noreferrer"
        />
        <NavItemMobile
          url={urls.bonds}
          name={t({ message: "Bond", id: "mainNav.bond" })}
          target="_blank"
          rel="noopener noreferrer"
        />
        <NavItemMobile url="/blog" name={t`Resources`} />
      </HeaderMobile>
    </>
  );
};
