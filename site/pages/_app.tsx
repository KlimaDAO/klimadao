import {
  GTMScript,
  GridContainer,
  Web3ContextProvider,
} from "@klimadao/lib/components";
import "@klimadao/lib/theme/normalize.css";
import "@klimadao/lib/theme/variables.css";
import { useTabListener } from "@klimadao/lib/utils";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { IS_PRODUCTION } from "lib/constants";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";

// keep globals on new line so that it is imported after variables.css
import "@klimadao/lib/theme/globals.css";
import { WALLETCONNECT_PROJECT_ID } from "lib/constants";

const loadFallbackOnServer = async () => {
  if (typeof window === "undefined") {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const englishMessages = require("../locale/en/messages").messages;
    i18n.load("en", englishMessages);
    i18n.activate("en");
  }
};

// TODO: throw if env vars are unset

function MyApp({ Component, pageProps, router }: AppProps) {
  useTabListener();

  const firstRender = useRef(true);
  const { translation, fixedThemeName } = pageProps;

  const locale = router.locale || (router.defaultLocale as string);
  // run only once on the first render (for server side)
  if (translation && firstRender.current) {
    i18n.load(locale, translation);
    i18n.activate(locale);
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
      i18n.load(locale, translation);
      i18n.activate(locale);
    }
  }, [locale]);

  useEffect(() => {
    if (fixedThemeName) {
      document.body.dataset.theme = fixedThemeName;
    }
  });

  return (
    <>
      <Web3ContextProvider walletConnectProjectId={WALLETCONNECT_PROJECT_ID}>
        <I18nProvider i18n={i18n}>
          <GridContainer>
            <Component {...pageProps} />
          </GridContainer>
        </I18nProvider>
      </Web3ContextProvider>
      <GTMScript tag="GTM-KWFJ9R2" is_production={IS_PRODUCTION} />
    </>
  );
}

export default MyApp;
