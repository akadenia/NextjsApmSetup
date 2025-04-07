'use client'

import { useEffect } from 'react'

import { Button } from '@components/button'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    // Add your error handling logic here
  }, [error])
  return (
    <html lang='en'>
      <body>
        {/* Your error handling UI */}
        <Button
          onClick={() => {
            reset()
          }}
        >
          Reset
        </Button>
      </body>
    </html>
  )
}
