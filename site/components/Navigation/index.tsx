import { FC } from "react";
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

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

type PageName = "Home" | "Buy" | "Resources" | "Disclaimer" | "Infinity";

export type Props = {
  activePage: PageName;
  showThemeToggle?: boolean;
};

export const Navigation: FC<Props> = ({
  activePage,
  showThemeToggle = true,
}) => {
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
              href={createLinkWithLocaleQuery(urls.app, locale)}
            />
          ),
        ]}
        activePage={activePage}
      >
        <NavItemDesktop
          url={"/buy"}
          name={t({ message: "Buy", id: "shared.buy" })}
          active={activePage === "Buy"}
        />
        <NavItemDesktop
          url={createLinkWithLocaleQuery(urls.stake, locale)}
          name={t({ message: "Stake", id: "shared.stake" })}
        />
        <NavItemDesktop
          url={"/infinity"}
          name={t({ message: "KlimaInfinity", id: "shared.infity" })}
        />
        <NavItemDesktop
          url={urls.loveletter}
          name={t({ message: "Love Letters", id: "shared.loveletters" })}
        />
        <NavItemDesktop
          url="/blog"
          name={t({ message: "Resources", id: "shared.resources" })}
          active={activePage === "Resources"}
        />
      </HeaderDesktop>

      <HeaderMobile
        buttons={[
          <ChangeLanguageButton key="ChangeLanguageButton" />,
          ...(showThemeToggle ? [<ThemeToggle key="ThemeToggle" />] : []),
        ]}
      >
        <NavItemMobile
          url="/buy"
          name={t({ message: "Buy", id: "shared.buy" })}
        />
        <NavItemMobile
          url={createLinkWithLocaleQuery(urls.stake, locale)}
          name={t({ message: "Stake", id: "shared.stake" })}
        />
        <NavItemMobile
          url="/infinity"
          name={t({ message: "KlimaInfinity", id: "shared.infinity" })}
        />
        <NavItemMobile
          url={urls.loveletter}
          name={t({ message: "Love Letters", id: "shared.loveletters" })}
        />
        <NavItemMobile
          url="/blog"
          name={t({ message: "Resources", id: "shared.resources" })}
        />
      </HeaderMobile>
    </>
  );
};
