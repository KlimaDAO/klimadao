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

if (process.env.IS_STATIC_EXPORT) {
  /**
   * In package.json we set this variable to indicate that this is a fleek-compatible static export
   * next/image still doesn't support static export, so we fallback to a custom loader defined in `app/components/Image`
   */
  nextConfig.images = {
    loader: "custom",
  };
}

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
