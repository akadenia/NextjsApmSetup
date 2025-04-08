// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const clientSentryInstance = Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // enabled: process.env.NEXT_PUBLIC_NODE_ENV !== 'development',
  enabled: true,
  environment: process.env.NEXT_PUBLIC_NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate:
    process.env.SENTRY_TRACES_SAMPLE_RATE !== undefined
      ? parseInt(process.env.SENTRY_TRACES_SAMPLE_RATE, 10)
      : 0.3,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  // Based on sentry, the replay integration is supported on the client only
  integrations: [
    ...(typeof window !== 'undefined'
      ? [
          Sentry.replayIntegration({
            // Additional Replay configuration goes in here, for example:
            maskAllText: false,
            blockAllMedia: false
          })
        ]
      : [])
  ]
})

export default clientSentryInstance
