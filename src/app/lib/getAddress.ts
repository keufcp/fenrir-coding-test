import type { AddressRequest, AddressResponse } from '@/app/types/index.d.ts'

export default async function GetAddressData(
  params: AddressRequest,
): Promise<AddressResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('lat', params.lat.toString())
  queryParams.append('lon', params.lon.toString())
  queryParams.append('output', params.output.toString())

  try {
    const response = await fetch(`/api/address?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: AddressResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching address data:', error)
    throw error // 呼び出し元でエラーを処理できるように再スロー
  }
}
