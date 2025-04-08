import { useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'

export default function useAppTheme() {
  const { setTheme, theme, systemTheme } = useTheme()
  useEffect(() => {
    if (!theme) {
      setTheme('system')
    }
  }, [])

  const onThemeSwitch = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }
  const dark = useMemo(() => {
    return theme === 'system' ? systemTheme === 'dark' : theme === 'dark'
  }, [theme, systemTheme])

  return { dark, onThemeSwitch }
}
