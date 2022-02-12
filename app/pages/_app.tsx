import "@klimadao/lib/theme/variables.css";
import "@klimadao/lib/theme/normalize.css";
import "@klimadao/lib/theme/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";

import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

// StyledEngineProvider allows us to pass "injectFirst", which makes it easier to override mui styles in our css
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <Component {...pageProps} />
      </I18nProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
