import "@klimadao/lib/theme/colors.css";
import "@klimadao/lib/theme/normalize.css";
import "@klimadao/lib/theme/globals.css";
import type { AppProps } from "next/app";

import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}

export default MyApp;
