/** @type {import('next').NextConfig} */

const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/resources",
        destination: "/blog",
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
    locales: ["en", "fr", "de", "ru", "zh-CN", "es"],
    defaultLocale: "en",
    localeDetection: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

if (!IS_PRODUCTION) {
  nextConfig.i18n = {
    ...nextConfig.i18n,
    locales: [...nextConfig.i18n.locales, "ko", "hi", "en-pseudo"],
  };
}

module.exports = nextConfig;
