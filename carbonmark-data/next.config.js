/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer");

const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

module.exports = async (phase, { defaultConfig }) => {
  const deviceSizes = (await import("../lib/out/theme/breakpoints.js"))
    .deviceSizes;

  const nextConfig = {
    reactStrictMode: true,
    //Provide source maps on preview deployments
    productionBrowserSourceMaps: !IS_PRODUCTION,
    async rewrites() {
      return [
          {
            source: "/:locale",
            destination: "/:locale/overview",
          },
          {
            source: "/:locale/token-details",
            destination: "/:locale/token-details/toucan",
          },
          {
            source: "/:locale/trends",
            destination: "/:locale/trends/by-pool",
          },
        ]
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
    experimental: {
      appDir: true,
    },
  };
  return withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  })(nextConfig);
};
