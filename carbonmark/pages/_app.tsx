import { Web3ContextProvider } from "@klimadao/lib/components";
import { useTabListener } from "@klimadao/lib/utils";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect, useRef } from "react";

// organize-imports-ignore
import "@klimadao/lib/theme/normalize.css";
// organize-imports-ignore
import "@klimadao/lib/theme/variables.css";
// organize-imports-ignore
import "@klimadao/carbonmark/theme/variables.css"; // overrides for variables.css - must be imported after
// organize-imports-ignore
import "@klimadao/lib/theme/globals.css"; // depends on variables

const loadFallbackOnServer = async () => {
  if (typeof window === "undefined") {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const englishMessages = require("../locale/en/messages").messages;
    i18n.load("en", englishMessages);
    i18n.activate("en");
  }
};

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
      <Web3ContextProvider>
        <I18nProvider i18n={i18n}>
          <Component {...pageProps} />
        </I18nProvider>
      </Web3ContextProvider>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PN73CG3');
            `,
        }}
      />
    </>
  );
}

export default MyApp;
