import "@klimadao/lib/theme/variables.css";
import "@klimadao/lib/theme/normalize.css";
import "@klimadao/lib/theme/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { StyledEngineProvider } from "@mui/material/styles";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useTabListener } from "@klimadao/lib/utils";

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
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KWFJ9R2');
            `,
        }}
      />
    </>
  );
}

export default MyApp;
