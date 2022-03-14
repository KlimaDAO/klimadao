/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer");

const nextConfig = {
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
};

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
