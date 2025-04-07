import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true,
    domains: process.env.ALLOWED_IMAGE_DOMAINS?.split(',') || []
  },
  webpack: { devtool: 'source-map' },
  // This value is is the default, but if your project will support mdx files, add them here.
  pageExtensions: ['js', 'jsx', 'ts', 'tsx']
}

// Injected content via Sentry wizard below

export default withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'akadenia',
    project: 'test'
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Lets use sentry release pipeline to send source maps to avoid duplicates on each build in CI
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
  }
)
