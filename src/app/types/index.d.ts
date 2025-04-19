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
 * @param start 検索開始位置
 * @param count 取得件数
 * @param budget 予算
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

/**
 * @description Hotpepper APIのレスポンスパラメータ
 * @param results 検索結果オブジェクト
 * @param results.results_available 検索結果の総数
 * @param results.results_returned 返却された検索結果の件数
 * @param results.results_start 検索結果の開始位置
 * @param results.shop 店舗情報の配列
 * @param results.shop[].id 店舗ID
 * @param results.shop[].name 店舗名
 * @param results.shop[].address 住所
 * @param results.shop[].lat 緯度
 * @param results.shop[].lng 経度
 * @param results.shop[].catch キャッチコピー
 * @param results.shop[].capacity 総席数
 * @param results.shop[].access アクセス情報
 * @param results.shop[].open 営業時間
 * @param results.shop[].photo 店舗写真情報
 * @param results.shop[].photo.mobile モバイル用写真
 * @param results.shop[].photo.mobile.l モバイル用大サイズ写真URL
 * @param results.shop[].photo.mobile.s モバイル用小サイズ写真URL
 * @param results.shop[].photo.pc PC用写真
 * @param results.shop[].photo.pc.l PC用大サイズ写真URL
 * @param results.shop[].photo.pc.s PC用小サイズ写真URL
 * @param results.shop[].budget 予算情報
 * @param results.shop[].budget.name 予算名（例：3001円～4000円）
 * @param results.shop[].urls URL情報
 * @param results.shop[].urls.pc PC用店舗ページURL
 * @param results.shop[].genre ジャンル情報
 * @param results.shop[].genre.name ジャンル名（例：イタリアン、和食など）
 * @param results.shop[].card カード情報文字列（利用可・不可の説明）
 * @param results.shop[].credit_card クレジットカード情報配列
 * @param results.shop[].credit_card[].name クレジットカード名（VISA、マスターなど）
 * @param results.shop[].credit_card[].code クレジットカード識別コード
 */
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

/**
 * @description Hotpepper Budget APIのレスポンスパラメータ
 * @param results 検索結果オブジェクト
 * @param results.budget 予算情報の配列
 * @param results.budget[].code 予算コード
 * @param results.budget[].name 予算名（例：3001円～4000円）
 *
 */
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

/**
 * @description Yahoo!リバースジオコーダAPI のレスポンスパラメータ
 * @param Feature 検索結果の配列
 * @param Feature[].Property 住所情報
 * @param Feature[].Property.country 国情報
 * @param Feature[].Property.country.Code 国コード
 * @param Feature[].Property.country.Name 国名
 * @param Feature[].Property.Address 住所
 */
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
