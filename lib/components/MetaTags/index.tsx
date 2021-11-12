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
}

export const MetaTags = (props: PageHeadProps) => {
  const noRobots = props.doNotIndex || !props.production;
  return (
    <>
      {noRobots && <meta name="robots" content="noindex" />}
      {/* {props.production && (
        <script
          defer
          data-domain="klimadao.finance"
          src="https://plausible.io/js/plausible.js"
        />
      )} */}
      <title>{props.title}</title>
      <meta name="description" content={props.metaDescription} />
      <meta property="og:description" content={props.metaDescription} />
      <meta property="og:title" content={props.mediaTitle} />
      {props.mediaImageSrc && (
        <meta property="og:image" content={props.mediaImageSrc} />
      )}
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.png" />
      <meta property="og:locale" content="en" />
    </>
  );
};
