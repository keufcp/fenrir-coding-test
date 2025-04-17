'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect,useState } from 'react'

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // クライアントサイドでのみマウント
  }, [])

  if (!mounted) {
    // テーマが適用されるまで非表示
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      enableSystem={false}
      storageKey='theme'
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
