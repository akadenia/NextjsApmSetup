import '../styles/app.css'

import { PropsWithChildren } from 'react'
import { Metadata, Viewport } from 'next'
import dynamicImport from 'next/dynamic'
import NextTopLoader from 'nextjs-toploader'

import Providers from './provider'

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export const metadata: Metadata = {
  title: {
    default: 'NextJS APM Setup',
    template: '%s · NextJS APM Setup'
  },
  icons: {
    icon: '/favicon.ico'
  },
  description: 'NextJS APM Setup description'
}

const ErrorTracer = dynamicImport(() => import('@components/error-tracer'), {
  ssr: false
})

const OpenTelemetry = dynamicImport(
  () => import('@components/open-telemetry'),
  {
    ssr: false
  }
)

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <html className='h-full' lang='en'>
      <body className='min-h-full'>
        <Providers>
          <NextTopLoader />
          <ErrorTracer />
          <OpenTelemetry />
          {children}
        </Providers>
      </body>
    </html>
  )
}
