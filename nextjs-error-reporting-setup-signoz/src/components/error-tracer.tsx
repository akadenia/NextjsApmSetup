'use client'

import { useEffect } from 'react'

import { reportErrorToSignoz } from '@utils/report-error-to-signoz'

export default function ErrorTracer() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      reportErrorToSignoz(event.error)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportErrorToSignoz(event.reason)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null // This component doesn't render anything
}
