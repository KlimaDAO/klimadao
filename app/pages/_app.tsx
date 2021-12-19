import "@klimadao/lib/theme/colors.css";
import "@klimadao/lib/theme/normalize.css";
import "@klimadao/lib/theme/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

import { init } from "../lib/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Activate the default locale on page load
    init();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}

export default MyApp;
