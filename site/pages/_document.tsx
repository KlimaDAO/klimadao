import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { cache } from "@emotion/css";
// import { ServerStyleSheets } from "@material-ui/core/styles";
import React from "react";
import { WebFonts, InitializeTheme } from "@klimadao/lib/components";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="theme-light">
        <Head>
          <WebFonts />
        </Head>
        <body>
          <InitializeTheme />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const renderStatic = async (html?: string) => {
  if (html === undefined) {
    throw new Error("did you forget to return html from renderToString?");
  }
  const { extractCritical } = createEmotionServer(cache);
  const { ids, css } = extractCritical(html);

  return { html, ids, css };
};

MyDocument.getInitialProps = async (ctx) => {
  const page = await ctx.renderPage();
  const { css, ids } = await renderStatic(page.html);
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: (
      <React.Fragment>
        {initialProps.styles}
        <style
          data-emotion={`css ${ids.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      </React.Fragment>
    ),
  };
};

// pasted from material-ui example
// it's compatible with server-side generation (SSG).
// MyDocument.getInitialProps = async (ctx) => {
//   // Render app and page and get the context of the page with collected side effects.
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   };
// };

export default MyDocument;
