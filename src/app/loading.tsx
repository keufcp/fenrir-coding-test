export default function LoadingPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold text-green-600'>位置情報を取得中...</h1>
      <p className='mt-4 text-lg text-gray-500'>しばらくお待ちください</p>
    </div>
  )
}
