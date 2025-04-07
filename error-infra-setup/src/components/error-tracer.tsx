'use client'

import { useEffect } from 'react'

export default function ErrorTracer() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.log('Ahaaa we have caught the error: ', event.error?.message)
      // Add error handling logic here
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.log(
        'Ahaaa we have caught the unhandled rejection: ',
        event.reason?.message
      )
      // Add unhandled rejection handling logic here
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
