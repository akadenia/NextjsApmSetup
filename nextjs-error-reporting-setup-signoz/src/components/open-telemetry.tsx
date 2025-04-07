'use client'

import { useEffect } from 'react'
import { initBrowserTraceCollector } from '@instrumentation/instrumentation.browser'

export default function OpenTelemetry() {
  useEffect(() => {
    initBrowserTraceCollector()
  }, [])
  return null
}
