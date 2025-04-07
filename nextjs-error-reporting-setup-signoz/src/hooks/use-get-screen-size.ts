import { useEffect, useState } from 'react'

export enum ScreenSizes {
  EXTRA_LARGE = 5,
  LARGE = 4,
  MEDIUM = 3,
  SMALL = 2,
  EXTRA_SMALL = 1
}

// REFERENCE: https://www.browserstack.com/guide/what-are-css-and-media-query-breakpoints
export const MediaQueryBreakpoints = {
  [ScreenSizes.EXTRA_SMALL]: '(max-width: 600px)',
  [ScreenSizes.SMALL]: '(min-width: 600px)',
  [ScreenSizes.MEDIUM]: '(min-width: 768px)',
  [ScreenSizes.LARGE]: '(min-width: 992px)',
  [ScreenSizes.EXTRA_LARGE]: '(min-width: 1200px)'
} as const

export function useGetScreenSize(): ScreenSizes {
  const [screenSize, setScreenSize] = useState<ScreenSizes>(
    ScreenSizes.EXTRA_SMALL
  )

  useEffect(() => {
    const handleResize = () => {
      const matchScreenSize: ScreenSizes = (
        Object.values(ScreenSizes) as ScreenSizes[]
      ).find((size) => window.matchMedia(MediaQueryBreakpoints[size]).matches)!
      setScreenSize(matchScreenSize)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}
