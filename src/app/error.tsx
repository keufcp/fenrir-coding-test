'use client'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
}: { error: Error } | { error: string }) {
  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-4xl font-bold text-red-600'>エラーが発生しました</h1>
      <p className='mt-4 text-lg text-gray-700'>
        ページをリロードしてみてください
      </p>
    </div>
  )
}
