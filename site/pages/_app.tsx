import "@klimadao/lib/theme/variables.css";
import "@klimadao/lib/theme/normalize.css";
import "@klimadao/lib/theme/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";

import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { GridContainer, Web3ContextProvider } from "@klimadao/lib/components";
import { getWeb3ModalStrings } from "lib/getWeb3ModalStrings";
import { useTabListener } from "@klimadao/lib/utils";

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
    <Web3ContextProvider strings={getWeb3ModalStrings()}>
      <I18nProvider i18n={i18n}>
        <GridContainer>
          <Component {...pageProps} />
        </GridContainer>
      </I18nProvider>
    </Web3ContextProvider>
  );
}

export default MyApp;
