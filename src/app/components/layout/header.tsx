'use client'
import { Moon, Sun } from 'lucide-react' //`太陽と月のマーク
import { useTheme } from 'next-themes' //`テーマの切り替え用のカスタムフック

import { Switch } from '@/components/ui/switch'

export function Header() {
  const { theme, setTheme } = useTheme()
  return (
    <header className='bg-customOlive sticky flex h-16 items-center justify-center px-4'>
      <h1 className='font-sans text-2xl font-black text-white select-none'>
        <b>現在地付近のレストラン情報</b>
      </h1>
      <div className='absolute right-4 flex items-center space-x-2'>
        <Sun className='h-4 w-4 text-slate-100' />
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
        <Moon className='h-4 w-4 text-slate-100' />
      </div>
    </header>
  )
}
