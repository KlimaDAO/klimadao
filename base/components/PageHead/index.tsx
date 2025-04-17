import { getOgImageSrc } from "@klimadao/lib/utils";
import Head from "next/head";

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
}

export const PageHead = (props: PageHeadProps) => {
  const noRobots = props.doNotIndex || !props.production;
  const mediaImageSrc = getOgImageSrc(props.mediaImageSrc);

  return (
    <Head>
      {noRobots && <meta name="robots" content="noindex" />}
      <title>{props.title}</title>
      <meta name="description" content={props.metaDescription} />
      <meta property="og:description" content={props.metaDescription} />
      <meta property="og:title" content={props.mediaTitle} />
      <meta property="og:image" content={mediaImageSrc} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.mediaTitle} />
      <meta name="twitter:description" content={props.metaDescription} />
      <meta name="twitter:image" content={mediaImageSrc} />

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
