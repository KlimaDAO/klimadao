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
              href={urls.klimaInfinityContactForm}
              target="_blank"
            />
          ),
        ]}
        activePage={activePage}
      >
        <NavItemDesktop
          url={createLinkWithLocaleQuery(urls.offset, locale)}
          name={t({ message: "Offset", id: "shared.offset" })}
        />
        <NavItemDesktop
          url={"/infinity"}
          name={t({ message: "Infinity", id: "shared.infity" })}
          active={activePage === "Infinity"}
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
          url={createLinkWithLocaleQuery(urls.offset, locale)}
          name={t({ message: "Offset", id: "shared.offset" })}
        />
        <NavItemMobile
          url="/infinity"
          name={t({ message: "Infinity", id: "shared.infinity" })}
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
