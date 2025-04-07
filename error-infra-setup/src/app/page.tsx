'use client'

import { useEffect, useState } from 'react'

function Home() {
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    const getData = async () => {
      const data = await new Promise<string>((resolve, reject) =>
        setTimeout(() => {
          reject(new Error('Error getting data'))
        }, 1000)
      )
      setData(data)
    }
    getData()
  }, [])

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {data}
    </div>
  )
}

export default Home
