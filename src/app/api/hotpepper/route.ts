'use server'
import dotenv from 'dotenv'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

// 環境変数を読み込む
try {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') })
} catch (error) {
  console.error('Failed to load environment variables:', error)
}

// 環境変数から URL と KEY を取得
const url = process.env.HOTPEPPER_API_URL!
const key = process.env.HOTPEPPER_API_KEY!

// エラーチェック
if (!url || !key) {
  throw new Error('URL or Key is missing in .env file')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const res = await fetch(`${url}?key=${key}&${searchParams}`)
  const data = await res.json()
  return NextResponse.json(data)
}
