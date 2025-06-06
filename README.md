# 簡易仕様書

### 作者

小池和輝

### アプリ名

fenrir-coding-test

#### コンセプト

店舗情報をカードで並べて表示

#### こだわったポイント

##### 技術面

- ダークモード対応
- 緯度経度だけでなく現在地の住所を表示
- GitHub Actionsを用いて自動的にコード整形

##### デザイン面

- カードにホバーしているときのリングエフェクト
- 文字の折り返しに可能な限り配慮
- 店舗詳細画面にて各項目をアイコンで表示し，その横に説明文を表示

### 公開したアプリの URL

https://fenrir-coding-test.vercel.app/

### 該当プロジェクトのリポジトリ URL（GitHub,GitLab など Git ホスティングサービスを利用されている場合）

https://github.com/keufcp/fenrir-coding-test

## 開発環境

Visual Studio Code `v1.99.2`

### 開発環境

```
Node    v22.12.0
React   v19.1.0
Next.js v15.3.0
```

### 開発言語

TypeScript

### テーブル定義(ER図)などの設計ドキュメント（ウェブアプリ）

APIキー等の機密情報を秘匿する設計

```mermaid
---
config:
  theme: neo-dark
---
sequenceDiagram
  actor U as User
  participant S as Server
  participant API
  U->>S: Request
  activate S
  S->>API: Request
  activate API
  API-->>S: Data
  deactivate API
  S-->>U: Data
  deactivate S

```

### 開発環境構築手順(ウェブアプリ)

1. リポジトリをクローンする
1. `.env.template`を元に環境変数を設定する  
   各APIサービスには登録が必要です

   1. [HotpepperグルメサーチAPI](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)
   1. [Hotpepper検索用ディナー予算マスタAPI](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)
   1. [Yahoo!リバースジオコーダAPI](https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/reversegeocoder.html)

   ```
   HOTPEPPER_API_URL=[HotpepperグルメサーチAPIのリクエストURL]
   BUDGET_API_URL=[Hotpepper検索用ディナー予算マスタAPIのリクエストURL]
   HOTPEPPER_API_KEY=[HotpepperAPIキー]
   YAHOO_API_URL=[Yahoo!リバースジオコーダAPIのリクエストURL]
   YAHOO_API_KEY=[Yahoo!リバースジオコーダAPIのClient ID]
   ```

1. プロジェクトディレクトリで下記コマンドを実行

   ```bash
   npm install

   npm run dev
   ```

1. ブラウザで `http://localhost:3000` にアクセスする

## 動作対象端末・OS

### 動作対象OS

- Windows 10/11 (実機確認)
- Android 12 (実機確認)
- iOS 15.6 (実機確認)

> [!NOTE]
> 上記以外のOSについては実機確認していません

### 動作対象ブラウザ

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

## 開発期間

12日

## アプリケーション機能

![画面の例](./public/page.png)
※ 多数の検索結果を出すため擬似的に現在地を東京に設定しています

### 機能一覧

<!-- - レストラン検索：ホットペッパーグルメサーチAPIを使用して、現在地周辺の飲食店を検索する。
- レストラン情報取得：ホットペッパーグルメサーチAPIを使用して、飲食店の詳細情報を取得する。
- 電話アプリ連携：飲食店の電話番号を電話アプリに連携する。
- 地図アプリ連携：飲食店の所在地を地図アプリに連携する。 -->

レストラン検索

- 現在地情報をGeolocationAPIを用いて取得
  - 同時に現在地の住所も表示する
- 取得した緯度経度情報を元にホットペッパーグルメサーチAPIを用いて飲食店の詳細情報を取得する
  - API情報は各ページごとに取得
    - 検索件数が多くなったときの読み込み遅延対策

### 画面一覧

<!-- - 検索画面 ：条件を指定してレストランを検索する。
- 一覧画面 ：検索結果の飲食店を一覧表示する。 -->

- 全般:
  - レスポンシブデザイン対応
  - API利用規約に則りクレジットを表示
- 検索画面: 現在地からの半径，予算で絞り込みが可能
- 一覧画面:
  - API取得情報から先頭10件を表示
  - ページングに対応し，各ページごとにデータ取得
  - 店舗画像がない場合は専用のアイコンを表示
- 店舗詳細画面:
  - モーダルにて店舗詳細画面を表示
  - 各項目をアイコンで表示し，その横に説明文を表示
  - 店舗画像がない場合は専用のアイコンを表示

### 使用しているAPI, SDK, ライブラリなど

#### API

- Geolocation API
- ホットペッパーグルメサーチAPI
- ホットペッパー検索用ディナー予算マスタAPI
- Yahoo!リバースジオコーダAPI

#### ライブラリ等

- dotenv `v16.5.0`
- ESLint `v9.24.0`
- Prettier `v3.5.3`
- shadcn/ui `v0.9.5`
- tailwindcss `v4.1.3`

### 機能向上案

- 極めて画面が小さいデバイスにて改行位置の都合で文字が重なってしまう問題の解決
  - iPhone SEシリーズなど
- 電話アプリ連携
- 地図アプリ連携
- 現時点で実装できていない検索条件の追加
  - クレジットカード種別でソート
  - 英語メニューでソート
  - 駐車場でソート
  - ほか...

### 自己評価

本課題を通じてサーバサイドレンダリングについてより知識が深まった．  
Geolocation APIではクライアントサイドで処理する必要がある一方，Hotpepper API等ではAPIキー保護のためサーバサイドで処理する必要があり，それぞれの実装方法を学ぶことができた．  
店舗詳細画面ではモーダルを用いているが，より適切な表示方法がないか検討したい．

### 技術面でアドバイスして欲しいポイント

- ディレクトリの切り方
  - 可能な限り先例に倣ったが実務レベルではどこまで細かく分けるのか
- .envファイル関連のエラー処理が十分できているか
