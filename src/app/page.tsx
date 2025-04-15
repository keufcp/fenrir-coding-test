'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import Card from '@/app/components/ui/card'
import { useGeolocation } from '@/app/hooks/useGeolocation'
import GetRestaurantData from '@/app/lib/getRestaurantData'
import convertHotpepperUrl from '@/app/lib/urlConverter'
import type {
  BudgetResponse,
  HotpepperRequest,
  HotpepperResponse,
} from '@/app/types/index.d.ts'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import ErrorPage from './error'
import GetAddressData from './lib/getAddress'
import GetBudgetData from './lib/getBudgetData'
import LoadingPage from './loading'

export default function Home() {
  const { coords, error } = useGeolocation()

  const [items, setItems] = useState<HotpepperResponse>()
  const [selectedRange, setSelectedRange] = useState<number>(5) // 初期値は最大(値5，半径3000m)に設定

  const [budget, setBudget] = useState<BudgetResponse>() // 予算情報を格納するステート
  // const selectedBudget = useRef<string>('') // 予算情報を格納するref // codeで管理
  const [selectedBudget, setSelectedBudget] = useState<string>('') // 予算情報を格納するステート // codeで管理

  const [address, setAddress] = useState<string>('') // 住所情報を格納するステート

  const rangeOptions = [
    { value: 1, label: '100m' },
    { value: 2, label: '500m' },
    { value: 3, label: '1000m' },
    { value: 4, label: '2000m' },
    { value: 5, label: '3000m' },
  ]

  // オプション情報を初期化
  const options = useRef<HotpepperRequest>({
    lat: 0,
    lng: 0,
    range: 3,
    genre: '',
    start: 1,
    count: 10,
    budget: '',
    format: 'json',
  })

  //? ページネーション処理
  const [totalItems, setTotalItems] = useState<number>(0)
  const totalPages = Math.ceil(totalItems / options.current.count)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const generatePagination = () => {
    const maxVisible = 7 // 一度に表示するページ番号の最大数を増やす
    const pages = []

    if (totalPages <= maxVisible) {
      // ページ数が少ない場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ number: i, isEllipsis: false })
      }
    } else {
      // 常に最初のページを表示
      pages.push({ number: 1, isEllipsis: false })

      // 現在のページの前後のページを表示するための開始・終了位置を計算
      // 前後2ページに変更
      const startPage = Math.max(2, currentPage - 2)
      const endPage = Math.min(totalPages - 1, currentPage + 2)

      // 最初のページと開始ページの間に隙間がある場合は省略記号を表示
      if (startPage > 2) {
        pages.push({ number: -1, isEllipsis: true })
      }

      // 中央のページ番号を追加
      for (let i = startPage; i <= endPage; i++) {
        pages.push({ number: i, isEllipsis: false })
      }

      // 終了ページと最後のページの間に隙間がある場合は省略記号を表示
      if (endPage < totalPages - 1) {
        pages.push({ number: -2, isEllipsis: true })
      }

      // 常に最後のページを表示
      pages.push({ number: totalPages, isEllipsis: false })
    }

    return pages
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    options.current.start = (page - 1) * options.current.count + 1
    fetchRestaurantData()
  }

  // APIからレストランデータを取得する関数
  const fetchRestaurantData = async () => {
    if (!coords) return
    try {
      options.current.lat = coords.latitude
      options.current.lng = coords.longitude
      const data = await GetRestaurantData(options.current)
      setItems(data) // 取得したデータをステートに格納
      setTotalItems(data.results.results_available) // 取得したデータの件数をステートに格納
    } catch (error) {
      console.error('Error fetching restaurant data:', error)
    }
  }

  const fetchBudgetData = async () => {
    try {
      const res = await GetBudgetData({ format: 'json' })
      setBudget(res)
    } catch (error) {
      console.error('Error fetching budget data:', error)
    }
  }
  useEffect(() => {
    fetchBudgetData()
  }, [])

  // 依存関係の問題に対処するためにuseCallbackを使用
  const fetchAddressData = useCallback(async () => {
    if (!coords) return
    try {
      const res = await GetAddressData({
        lat: coords.latitude,
        lon: coords.longitude,
        output: 'json',
      })
      setAddress(res.Feature[0].Property.Address) // 住所情報を格納
    } catch (err) {
      console.error('Error fetching address data:', err)
    }
  }, [coords])

  useEffect(() => {
    if (coords) {
      fetchAddressData()
    }
  }, [coords, fetchAddressData])

  if (error) {
    console.error('Geolocation error:', error)
    return <ErrorPage error={error} />
  }
  if (!coords) return <LoadingPage />

  const handleSubmit = async (e: any) => {
    e.preventDefault() // ページリロードを防ぐ
    // 検索時は必ず1ページ目から表示する
    setCurrentPage(1)
    // 検索時は先頭から取得する
    options.current.start = 1
    fetchRestaurantData()
  }

  const handleBudgetChange = (e: any) => {
    options.current.budget = e
    setSelectedBudget(e)
  }

  return (
    <>
      <h1 className='flex justify-center pt-2 text-lg font-semibold md:text-xl'>
        現在地情報
      </h1>
      <div className='m-2 grid grid-cols-3 gap-2 rounded-md bg-slate-200 p-2 md:m-4 md:gap-4 dark:bg-slate-700 dark:text-slate-200'>
        <p className='flex justify-center text-xs md:text-base'>
          緯度: {coords.latitude}
        </p>
        <p className='flex justify-center text-xs md:text-base'>
          経度: {coords.longitude}
        </p>
        <p className='flex justify-center text-xs md:text-base'>
          住所: {address}
        </p>
      </div>
      <h1 className='flex justify-center text-lg font-semibold md:text-xl'>
        現在地からの半径
      </h1>
      <div className='m-2 grid grid-cols-3 justify-center gap-2 md:m-4 md:gap-4'>
        {rangeOptions.map((option) => (
          <button
            key={option.value}
            type='button'
            className={`cursor-pointer rounded-md bg-slate-200 p-1 text-sm text-slate-700 hover:shadow-xl hover:shadow-slate-500/50 md:p-2 md:text-base dark:bg-slate-700 dark:text-slate-200 ${selectedRange === option.value ? 'ring-2 ring-slate-400' : 'ring-transparent'}`}
            onClick={() => {
              options.current.range = option.value
              setSelectedRange(option.value)
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      <h1 className='flex justify-center text-lg font-semibold md:text-xl'>
        予算
      </h1>
      <div className='m-2 grid grid-cols-2 justify-center gap-2 sm:grid-cols-3 md:m-4 md:grid-cols-5 md:gap-4 lg:grid-cols-7'>
        {budget &&
          budget.results.budget.map((data: any) => (
            <button
              type='button'
              key={data.code}
              onClick={() => {
                handleBudgetChange(data.code)
              }}
              className={`cursor-pointer rounded-md bg-slate-200 p-1 text-xs text-slate-700 hover:shadow-xl hover:shadow-slate-500/50 md:p-2 md:text-sm dark:bg-slate-700 dark:text-slate-200 ${selectedBudget === data.code ? 'ring-2 ring-slate-400' : 'ring-transparent'}`}
            >
              {data.name}
            </button>
          ))}
        <button
          type='button'
          onClick={() => {
            handleBudgetChange('')
          }}
          className={`cursor-pointer rounded-md bg-slate-200 p-1 text-xs text-slate-700 hover:shadow-xl hover:shadow-slate-500/50 md:p-2 md:text-sm dark:bg-slate-700 dark:text-slate-200 ${selectedBudget === '' ? 'ring-2 ring-slate-400' : 'ring-transparent'}`}
        >
          選択なし
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className='m-2 flex justify-center gap-2 md:m-4 md:gap-4'
      >
        <button
          type='submit'
          className='w-full cursor-pointer rounded-md bg-slate-600 p-1 text-sm font-semibold tracking-[0.5em] text-slate-100 ring-2 ring-transparent hover:shadow-xl hover:shadow-slate-500/50 md:p-2 md:text-base md:tracking-[1em] dark:bg-slate-800 dark:text-slate-100'
          aria-label='レストランを検索'
        >
          検索
        </button>
      </form>
      <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {items && items?.results?.shop?.length > 0 ? (
          items.results.shop.map((data, index) => (
            <Card
              key={data.id || index}
              name={data.name}
              url={data.urls.pc}
              access={data.access}
              // APIから取得した画像はあまりにも小さいので大きい画像を取得する
              image={convertHotpepperUrl(data.photo.pc.l)}
              address={data.address}
              open={data.open}
              budget={data.budget.name}
              genre={data.genre.name}
              catch={data.catch}
              capacity={data.capacity}
              card={data.card}
              credit_card={data.credit_card || []}
            />
          ))
        ) : items ? (
          <div className='col-span-full py-8 text-center'>
            検索結果がありません。別の条件で検索してください。
          </div>
        ) : null}
      </div>
      <div className='w-full overflow-x-auto py-4'>
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {generatePagination().map((page, index) => (
              <PaginationItem key={index}>
                {page.isEllipsis ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href='#'
                    onClick={() => handlePageChange(page.number)}
                    isActive={page.number === currentPage}
                  >
                    {page.number}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
