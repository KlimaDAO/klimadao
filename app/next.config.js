/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer");
const { withSentryConfig } = require("@sentry/nextjs");

let nextConfig = {
  eslint: {
    dirs: ["actions", "components", "lib", "pages", "state"],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/buy",
        destination: "/#/buy",
        permanent: true,
      },
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
  experimental: {
    optimizePackageImports: ["@klimadao/lib/utils"],
  },
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
};

/**
 * In package.json we set this variable to indicate that this is a fleek-compatible static export
 * next/image still doesn't support static export, so we fallback to a custom loader defined in `app/components/Image`
 */
if (process.env.IS_STATIC_EXPORT) {
  nextConfig.images = {
    loader: "custom",
  };
  nextConfig.env = {
    IS_STATIC_EXPORT: true,
  };
}

// Add bundleAnalyzer
nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
nextConfig = withSentryConfig(nextConfig, {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
});

module.exports = nextConfig;
