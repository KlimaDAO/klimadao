/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    dirs: ["actions", "components", "lib", "pages", "state"],
  },
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
        source: "/wrap",
        destination: "/#/wrap",
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

let withBundleAnalyzer;
if (process.env.ANALYZE === "true") {
  withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
} else {
  withBundleAnalyzer = (config) => config;
}

module.exports = withBundleAnalyzer(config);
