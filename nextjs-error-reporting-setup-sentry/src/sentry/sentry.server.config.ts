// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const serverSentryInstance = Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // enabled: process.env.NEXT_PUBLIC_NODE_ENV !== 'development',
  enabled: true,

  environment: process.env.NEXT_PUBLIC_NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate:
    process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE !== undefined
      ? parseInt(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE, 10)
      : 0.3,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
})

export default serverSentryInstance
