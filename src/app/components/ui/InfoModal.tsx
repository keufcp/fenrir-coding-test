import Image from 'next/image'
import Modal from 'react-modal'

import AccessIcon from '@/app/components/icons/access'
import CapacityIcon from '@/app/components/icons/capacity'
import ClockIcon from '@/app/components/icons/clock'
import CloseIcon from '@/app/components/icons/close'
import CreditCardIcon from '@/app/components/icons/creditCard'
import InfoIcon from '@/app/components/icons/info'
import KitchenIcon from '@/app/components/icons/kitchen'
import MapPinIcon from '@/app/components/icons/mapPin'
import TagIcon from '@/app/components/icons/tag'
import WorldIcon from '@/app/components/icons/world'
import YenIcon from '@/app/components/icons/yen'

Modal.setAppElement('header')

interface InfoModalProps {
  isOpen: boolean
  closeModal: () => void
  data: any
}

export default function InfoModal({
  isOpen,
  closeModal,
  data,
}: InfoModalProps) {
  if (!data) return null
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName='fixed inset-0 bg-slate-900/75 z-40'
        className='fixed inset-0 z-50 flex items-center justify-center'
      >
        <div className='max-h-6xl relative flex max-h-[80vh] w-[90%] max-w-6xl flex-col overflow-y-auto rounded-lg bg-slate-100 p-6 md:flex-row dark:bg-slate-900'>
          <button
            className='absolute top-4 right-4 cursor-pointer rounded-lg bg-slate-200/60 p-0.5 hover:bg-slate-400 hover:text-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-700'
            onClick={closeModal}
          >
            <CloseIcon className='h-10 w-10' />
          </button>
          <Image
            src={data.image === undefined ? '/photo-x.svg' : data.image}
            alt={data.name}
            width={600}
            height={600}
            quality={100}
            className='w-full object-contain md:w-1/2'
          />
          <div className='flex w-full flex-col justify-center p-4 md:w-1/2'>
            <h1 className='flex items-center py-2 text-lg font-semibold text-wrap md:text-xl'>
              <KitchenIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.name}
            </h1>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <InfoIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.catch === '' ? '情報がありません' : data.catch}
            </p>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <AccessIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.access}
            </p>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <MapPinIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.address}
            </p>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <ClockIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.open}
            </p>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <YenIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.budget}
            </p>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <TagIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.genre}
            </p>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <CreditCardIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              <span className='gird-rows-2 grid'>
                {data.card === '利用可' ? 'カード利用可' : 'カード利用不可'}
                <span className='break-normal'>
                  {data.card === '利用可'
                    ? data.credit_card.map((card: any) => (
                        <span
                          key={card.code}
                          className='mr-1 text-xs md:mr-2 md:text-sm'
                        >
                          {card.name}
                        </span>
                      ))
                    : ''}
                </span>
              </span>
            </p>
            <p className='flex items-center py-1 text-base break-keep md:py-2 md:text-lg'>
              <CapacityIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              {data.capacity === '' ? '情報がありません' : `${data.capacity}人`}
            </p>
            <p className='flex items-center py-1 text-base md:py-2 md:text-lg'>
              <WorldIcon className='pointer-events-none mr-2 h-5 w-5 flex-shrink-0 md:mr-4 md:h-6 md:w-6' />
              <a
                href={data.url}
                target='_blank'
                rel='noopener noreferrer'
                className='truncate overflow-hidden text-sm text-blue-500 hover:underline md:text-base'
              >
                {data.url}
              </a>
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}
