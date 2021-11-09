import { IS_PRODUCTION } from "lib/constants";
import Head from "next/head";

export interface PageHeadProps {
  mediaImageSrc?: string;
  doNotIndex?: boolean;
  /** <title> tag */
  title: string;
  /** og:title */
  mediaTitle: string;
  /** og:description */
  metaDescription: string;
}

export const PageHead = (props: PageHeadProps) => {
  const noRobots = props.doNotIndex || !IS_PRODUCTION;
  return (
    <Head>
      {noRobots && <meta name="robots" content="noindex" />}
      {IS_PRODUCTION && (
        <script
          defer // this script doesn't work with next.js Script component
          data-domain="klima.vercel.app"
          src="https://plausible.io/js/plausible.js"
        />
      )}
      <title>{props.title}</title>
      <meta name="description" content={props.metaDescription} />
      <meta property="og:description" content={props.metaDescription} />
      <meta property="og:title" content={props.mediaTitle} />
      <meta
        property="og:image"
        content={props.mediaImageSrc ?? "/og-media.jpg"}
      />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.png" />
      <meta property="og:locale" content="en" />
    </Head>
  );
};
