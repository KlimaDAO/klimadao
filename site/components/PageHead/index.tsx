import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export interface PageHeadProps {
  production: boolean;
  /** <title> tag */
  title: string;
  /** og:title */
  mediaTitle: string;
  /** og:description */
  metaDescription: string;
  doNotIndex?: boolean;
  mediaImageSrc?: string;
  /** displays some useful meta tags if current page is an article */
  isArticle?: boolean;
}

export const PageHead = (props: PageHeadProps) => {
  const noRobots = props.doNotIndex || !props.production;
  const router = useRouter();
  const relativePath = router.asPath.split(/[#,?]/)[0];
  const canonicalUrl = `https://www.klimadao.finance${relativePath}`;

  return (
    <Head>
      {noRobots && <meta name="robots" content="noindex" />}
      {!noRobots && (
        <script
          defer
          data-domain="klimadao.finance"
          src="https://plausible.io/js/plausible.js"
        />
      )}
      <title>{props.title}</title>
      <meta property="og:title" content={props.mediaTitle} />

      <meta name="description" content={props.metaDescription} />
      <meta property="og:description" content={props.metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content={router.locale || "en"} />
      <meta property="og:site_name" content="KlimaDAO" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.mediaTitle} />
      <meta name="twitter:description" content={props.metaDescription} />

      {props.mediaImageSrc && (
        <meta property="og:image" content={props.mediaImageSrc} />
      )}

      {props.mediaImageSrc && (
        <meta name="twitter:image" content={props.mediaImageSrc} />
      )}

      {props.isArticle && (
        <>
          <meta property="og:type" content="article" />
        </>
      )}
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00cc33" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};
