/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/stake",
        destination: "/#/stake",
        permanent: true,
      },
      {
        source: "/info",
        destination: "/#/info",
        permanent: true,
      },
      {
        source: "/bonds",
        destination: "/#/bonds",
        permanent: true,
      },
      {
        source: "/bonds/:bond",
        destination: "/#/bonds/:bond",
        permanent: true,
      },
      {
        source: "/redeem",
        destination: "/#/redeem",
        permanent: true,
      },
      {
        source: "/pklima",
        destination: "/#/pklima",
        permanent: true,
      },
    ];
  },
};
