/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "https://klimadao.medium.com/",
        permanent: true,
      },
    ];
  },
};
