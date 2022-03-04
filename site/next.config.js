/** @type {import('next').NextConfig} */
module.exports = {
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
        source: "/api/block-rate",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
  i18n: {
    locales: ["en", "fr", "pseudo"],
    defaultLocale: "en",
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};
