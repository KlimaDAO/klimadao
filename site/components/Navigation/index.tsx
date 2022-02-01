import { FC } from "react";
import Link from "next/link";
import { t } from "@lingui/macro";
import {
  HeaderDesktop,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
} from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";

type PageName = "Home" | "Resources";

export type Props = {
  activePage: PageName;
};

export const Navigation: FC<Props> = (props) => {
  return (
    <>
      <HeaderDesktop
        link={Link}
        buttons={[
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
          link={Link}
          active={props.activePage === "Home"}
        />
        <NavItemDesktop
          url={urls.tutorial}
          name={t`Get Klima`}
          rel="noopener noreferrer"
          target="_blank"
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
          url="/resources"
          name={t`Resources`}
          link={Link}
          active={props.activePage === "Resources"}
        />
      </HeaderDesktop>
      <HeaderMobile>
        <NavItemMobile
          url={urls.home}
          name={t({ message: "Home", id: "mainNav.home" })}
        />
        <NavItemMobile
          url={urls.tutorial}
          name={t`Get Klima`}
          target="_blank"
          rel="noreferrer noopener"
        />
        <NavItemMobile
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemMobile
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
        />
        <NavItemMobile url="/resources" name={t`Resources`} />
      </HeaderMobile>
    </>
  );
};
