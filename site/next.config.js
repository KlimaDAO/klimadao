/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer");

const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

module.exports = async (phase, { defaultConfig }) => {
  const getLocales = (await import("../lib/out/utils/getLocales/index.js"))
    .getLocales;
  const deviceSizes = (await import("../lib/out/theme/breakpoints.js"))
    .deviceSizes;

  const nextConfig = {
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
  };
  return withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  })(nextConfig);
};
