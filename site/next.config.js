/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer");
const { withSentryConfig } = require("@sentry/nextjs");

const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

module.exports = async (phase, { defaultConfig }) => {
  const getLocales = (await import("../lib/out/utils/getLocales/index.js"))
    .getLocales;
  const deviceSizes = (await import("../lib/out/theme/breakpoints.js"))
    .deviceSizes;

  let nextConfig = {
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: "/blog",
          destination: "/resources",
          permanent: true,
        },
        {
          source: "/podcast",
          destination: "/resources",
          permanent: true,
        },
        {
          source: "/cms",
          destination: "https://klimadao.sanity.studio/desk",
          permanent: true,
        },
        {
          source: "/marketplace/users",
          destination: "/marketplace/users/login",
          permanent: true,
        },
      ];
    },
    async headers() {
      return [
        {
          // from vercel docs example
          source: "/api/block-rate",
          headers: [
            {
              key: "Access-Control-Allow-Credentials",
              value: "true",
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
        {
          source: "/:path*",
          headers: [
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000; includeSubDomains",
            },
            {
              key: "Content-Security-Policy",
              value: "upgrade-insecure-requests",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
            },
            {
              key: "X-XSS-Protection",
              value: "0",
            },
          ],
        },
      ];
    },
    i18n: {
      locales: Object.keys(getLocales(IS_PRODUCTION)),
      defaultLocale: "en",
      localeDetection: true,
    },
    images: {
      domains: ["cdn.sanity.io"],
      deviceSizes,
    },
    sentry: {
      // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
      // for client-side builds. (This will be the default starting in
      // `@sentry/nextjs` version 8.0.0.) See
      // https://webpack.js.org/configuration/devtool/ and
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
      // for more information.
      hideSourceMaps: true,
      disableServerWebpackPlugin: true,
      disableClientWebpackPlugin: true,
    },
  };
  nextConfig = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  })(nextConfig);

  return withSentryConfig(nextConfig, {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
  });
};
