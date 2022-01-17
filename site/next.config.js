/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/resources/blog",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/resources/blog",
        permanent: true,
      },
      {
        source: "/cms",
        destination: "https://klimadao.sanity.studio/desk",
        permanent: true,
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
