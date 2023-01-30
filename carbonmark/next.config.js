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
        {
          source: "/users",
          destination: "/users/login",
          permanent: true,
        },
      ];
    },
    async headers() {
      return [
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
    experimental: {
      appDir: false,
    },
  };
  return withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  })(nextConfig);
};
