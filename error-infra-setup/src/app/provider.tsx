'use client'

import dynamic from 'next/dynamic'

const ThemeProvider = dynamic(() => import('@components/theme-provider'), {
  ssr: false
})
const Toaster = dynamic(async () => (await import('react-hot-toast')).Toaster, {
  ssr: false
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
