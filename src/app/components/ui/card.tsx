'use client'
import Image from 'next/image'
import { useState } from 'react'

import InfoModal from '@/app/components/ui/InfoModal'

export default function Card(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className='cursor-pointer overflow-hidden rounded-lg bg-slate-100 shadow-2xl ring-slate-500/50 transition-shadow duration-300 hover:shadow-xl hover:ring-2 hover:shadow-slate-500/50 dark:bg-slate-900'>
        <div onClick={openModal} className='block'>
          <div className='relative aspect-[4/3] w-full'>
            <Image
              src={props.image === undefined ? '/photo-x.svg' : props.image}
              alt={props.name}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = '/photo-x.svg'
              }}
            />
          </div>
          <div className='p-4'>
            <h1 className='truncate text-base font-semibold text-slate-800 md:text-lg dark:text-slate-200'>
              {props.name}
            </h1>
            <h2 className='mt-2 line-clamp-3 text-xs text-slate-500 md:mt-4 md:text-sm dark:text-slate-300'>
              {props.access}
            </h2>
          </div>
        </div>
      </div>
      <InfoModal isOpen={isModalOpen} closeModal={closeModal} data={props} />
    </>
  )
}
