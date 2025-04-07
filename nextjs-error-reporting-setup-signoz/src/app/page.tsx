'use client'

import { Button } from '@components/button'

function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <Button
        onClick={() => {
          throw new Error('Error from button event handler')
        }}
      >
        Click to throw error
      </Button>
    </div>
  )
}

export default Home
