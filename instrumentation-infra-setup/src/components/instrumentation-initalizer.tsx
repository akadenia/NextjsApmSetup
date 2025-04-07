'use client'

import { useEffect } from 'react'
import { initInstrumentation } from '@instrumentation/instrumentation.browser'

export default function InstrumentationInitializer() {
  useEffect(() => {
    initInstrumentation()
  }, [])
  return null
}
