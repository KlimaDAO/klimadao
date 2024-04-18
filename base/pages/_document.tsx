import { cache } from "@emotion/css";
import createEmotionServer from "@emotion/server/create-instance";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { WebFonts } from "../components/WebFonts";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <WebFonts />
        </Head>
        <body data-theme="theme-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// // From emotion docs and nextjs repo example. Injects classnames in server-rendered html tags.
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

export default MyDocument;
