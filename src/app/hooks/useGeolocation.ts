'use client'
import { useEffect, useState } from 'react'

import type { Coordinates } from '@/app/types/index.d.ts'

export function useGeolocation() {
  const [coords, setCoords] = useState<Coordinates | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation APIはこのブラウザでサポートされていません')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (err) => {
        setError(`位置情報の取得に失敗しました: ${err.message}`)
      },
    )
  }, [])

  return { coords, error }
}
