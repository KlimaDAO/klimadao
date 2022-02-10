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

type PageName = "Home" | "Get Klima" | "Resources";

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
          name={t`Get Klima`}
          active={props.activePage === "Get Klima"}
        />
        <NavItemDesktop
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemDesktop
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
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
        <NavItemMobile url="/buy" name={t`Get Klima`} />
        <NavItemMobile
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemMobile
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
        />
        <NavItemMobile url="/blog" name={t`Resources`} />
      </HeaderMobile>
    </>
  );
};
