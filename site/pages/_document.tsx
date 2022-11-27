import { cache } from "@emotion/css";
import createEmotionServer from "@emotion/server/create-instance";
import { InitializeTheme, WebFonts } from "@klimadao/lib/components";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const { fixedThemeName } = this.props.__NEXT_DATA__.props.pageProps;

    return (
      <Html>
        <Head>
          <WebFonts />
        </Head>
        <body data-theme={fixedThemeName}>
          {!fixedThemeName && <InitializeTheme />}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// From emotion docs and nextjs repo example. Injects classnames in server-rendered html tags.
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
      <>
        {initialProps.styles}
        <style
          data-emotion={`css ${ids.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      </>
    ),
  };
};

export default MyDocument;
