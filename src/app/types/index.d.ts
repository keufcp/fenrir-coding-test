/**
 * @description geolocation APIによる位置情報を格納するための型
 * @param latitude 緯度
 * @param longitude 経度
 */
export type Coordinates = {
  latitude: number
  longitude: number
}

/**
 * @description Hotpepper APIのリクエストパラメータ
 * @param lat 緯度
 * @param lng 経度
 * @param range 半径, 設定方法は次の通り
 *  1: 100m
 *  2: 500m
 *  3: 1000m (初期値)
 *  4: 2000m
 *  5: 3000m
 * @param genre ジャンル
 * @param count 取得件数
 * @param format レスポンス形式
 */
export type HotpepperRequest = {
  lat: number
  lng: number
  range: number | 3
  genre: string | ''
  start: number | 1
  count: number | 10
  budget: string | ''
  format: string | 'json'
}

export type HotpepperResponse = {
  results: {
    results_available: number
    results_returned: number
    results_start: number
    shop: Array<{
      id: string
      name: string
      address: string
      lat: number
      lng: number
      catch: string
      capacity: string
      access: string
      open: string
      photo: {
        mobile: {
          l: string
          s: string
        }
        pc: {
          l: string
          s: string
        }
      }
      budget: {
        name: string
      }
      urls: {
        pc: string
      }
      genre: {
        name: string
      }
      card: string
      credit_card: Array<{
        name: string
        code: string
      }>
    }>
  }
}

/**
 * @description Hotpepper Budget APIのリクエストパラメータ
 * @param format レスポンス形式
 *  json: JSON形式
 *  xml: XML形式
 */
export type BudgetRequest = {
  format: string | 'json'
}

export type BudgetResponse = {
  results: {
    budget: Array<{
      code: string
      name: string
    }>
  }
}

/**
 * @description Yahoo!リバースジオコーダAPI のリクエストパラメータ
 * @param lat 緯度
 * @param lon 経度
 * @param output レスポンス形式
 *  json: JSON形式
 *  xml: XML形式
 */
export type AddressRequest = {
  lat: number
  lon: number
  output: string | 'json'
}

export type AddressResponse = {
  Feature: Array<{
    Property: {
      country: {
        Code: string
        Name: string
      }
      Address: string
    }
  }>
}
