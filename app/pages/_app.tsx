import { GTMScript } from "@klimadao/lib/components";
import "@klimadao/lib/theme/globals.css";
import "@klimadao/lib/theme/normalize.css";
import "@klimadao/lib/theme/variables.css";
import { useTabListener } from "@klimadao/lib/utils";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { StyledEngineProvider } from "@mui/material/styles";
import { IS_PRODUCTION } from "lib/constants";
import type { AppProps } from "next/app";

// StyledEngineProvider allows us to pass "injectFirst", which makes it easier to override mui styles in our css
function MyApp({ Component, pageProps }: AppProps) {
  useTabListener();
  return (
    <>
      <StyledEngineProvider injectFirst>
        <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
          <Component {...pageProps} />
        </I18nProvider>
      </StyledEngineProvider>
      <GTMScript tag="GTM-KWFJ9R2" is_production={IS_PRODUCTION} />
    </>
  );
}

export default MyApp;
