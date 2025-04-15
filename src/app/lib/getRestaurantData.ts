import type {
  HotpepperRequest,
  HotpepperResponse,
} from '@/app/types/index.d.ts'

export default async function GetRestaurantData(
  params: HotpepperRequest,
): Promise<HotpepperResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('lat', params.lat.toString())
  queryParams.append('lng', params.lng.toString())
  queryParams.append('range', params.range.toString())
  queryParams.append('genre', params.genre.toString())
  queryParams.append('start', params.start.toString())
  queryParams.append('count', params.count.toString())
  queryParams.append('budget', params.budget.toString())
  queryParams.append('type', 'credit_card') // クレジットカード情報を取得
  queryParams.append('format', params.format.toString())

  try {
    const response = await fetch(`/api/hotpepper?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: HotpepperResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching restaurant data:', error)
    throw error // 呼び出し元でエラーを処理できるように再スロー
  }
}
