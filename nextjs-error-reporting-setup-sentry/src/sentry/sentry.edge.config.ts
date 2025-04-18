// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const edgeSentryInstance = Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // enabled: process.env.NEXT_PUBLIC_NODE_ENV !== 'dev',
  enabled: true,
  environment: process.env.NEXT_PUBLIC_NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate:
    process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE !== undefined
      ? parseInt(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE, 10)
      : 0.3,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false
})

export default edgeSentryInstance
