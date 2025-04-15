import type { BudgetRequest, BudgetResponse } from '@/app/types/index.d.ts'

export default async function GetBudgetData(
  params: BudgetRequest,
): Promise<BudgetResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('format', params.format.toString())

  try {
    const response = await fetch(`/api/budget?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: BudgetResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching budget data:', error)
    throw error // 呼び出し元でエラーを処理できるように再スロー
  }
}
