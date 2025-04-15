import Image from 'next/image'

export function Footer() {
  return (
    <div className='mt-auto flex h-auto w-full flex-col items-center justify-center gap-4 py-4 text-slate-500 sm:flex-row sm:gap-8 dark:text-slate-400'>
      <div className='text-sm text-slate-500'>
        <a href='https://webservice.recruit.co.jp/'>
          <Image
            src='https://webservice.recruit.co.jp/banner/hotpepper-s.gif'
            alt='ホットペッパーグルメ Webサービス'
            width='135'
            height='17'
            title='ホットペッパーグルメ Webサービス'
          ></Image>
        </a>
      </div>
      <div className='m-4 hover:text-blue-500 hover:underline'>
        <a
          href='https://developer.yahoo.co.jp/sitemap/'
          title='Webサービス by Yahoo! JAPAN'
        >
          Webサービス by Yahoo! JAPAN
        </a>
      </div>
    </div>
  )
}
