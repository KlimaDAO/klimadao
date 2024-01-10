import { GTMScript, Web3ContextProvider } from "@klimadao/lib/components";
import { useTabListener } from "@klimadao/lib/utils";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { UserTracker } from "components/UserTracker";
import { IS_PRODUCTION, WALLETCONNECT_PROJECT_ID } from "lib/constants";
import { activateLocale, loadTranslation } from "lib/i18n";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
// organize-imports-ignore
import "@klimadao/lib/theme/normalize.css";
// organize-imports-ignore
import "@klimadao/lib/theme/variables.css";
// organize-imports-ignore
import "@klimadao/carbonmark/theme/variables.css"; // overrides for variables.css - must be imported after
// organize-imports-ignore
import "@klimadao/lib/theme/globals.css"; // depends on variables
// organize-imports-ignore
import "@klimadao/carbonmark/theme/globals.css"; // carbonmark specific overrides for globals.css

const loadFallbackOnServer = async () => {
  if (typeof window === "undefined") {
    const messages = await loadTranslation("en");
    activateLocale("en", messages);
  }
};

function MyApp({ Component, pageProps, router }: AppProps) {
  useTabListener();

  const firstRender = useRef(true);
  const { translation, fixedThemeName } = pageProps;

  const locale = router.locale || (router.defaultLocale as string);
  // run only once on the first render (for server side)
  if (translation && firstRender.current) {
    activateLocale(locale, translation);
    firstRender.current = false;
  } else if (
    // server only
    typeof window === "undefined" &&
    router.isFallback &&
    firstRender.current
  ) {
    loadFallbackOnServer();
    firstRender.current = false;
  }

  // listen for the locale changes
  useEffect(() => {
    if (translation && !router.isFallback) {
      activateLocale(locale, translation);
    }
  }, [locale]);

  useEffect(() => {
    if (fixedThemeName) {
      document.body.dataset.theme = fixedThemeName;
    }
  });

  return (
    <>
      <Web3ContextProvider
        appName="carbonmark"
        showMumbaiOption={!IS_PRODUCTION}
        walletConnectProjectId={WALLETCONNECT_PROJECT_ID}
      >
        <UserTracker>
          <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
            <Component {...pageProps} />
          </I18nProvider>
        </UserTracker>
      </Web3ContextProvider>
      <GTMScript tag="GTM-PN73CG3" is_production={IS_PRODUCTION} />
    </>
  );
}

export default MyApp;
