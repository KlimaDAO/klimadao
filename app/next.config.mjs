/** @type {import('next').NextConfig} */

import withBundleAnalyzer from "@next/bundle-analyzer";
import { securityHeaders } from "@klimadao/lib/config";

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
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  nextConfig
);
