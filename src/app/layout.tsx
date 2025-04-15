import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Footer } from './components/layout/footer'
import { Header } from './components/layout/header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '現在地付近のレストラン情報',
  description:
    'リクルートWEBサービスのホットペッパーグルメサーチAPIを用いた、現在地付近のレストラン情報を検索するウェブアプリ',
  openGraph: {
    title: '現在地付近のレストラン情報',
    description:
      'リクルートWEBサービスのホットペッパーグルメサーチAPIを用いた、現在地付近のレストラン情報を検索するウェブアプリ',
    // url: 'https://example.com',
    siteName: '現在地付近のレストラン情報',
    // images: [{ url: 'https://example.com/og.png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
