import React from 'react'

import { hamsterCoin, mainCharacter } from '@assets/images'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@components/ui/sheet'

interface PointsSheetProps {
  open: boolean
  onClose?: () => void
  title?: string
  description?: React.ReactNode
  mainImage?: string
  mainImageAlt?: string
  mainImageClass?: string
  content: React.ReactNode
  buttonText?: string
  buttonAction?: () => void
  isLoading?: boolean
}

const PointsSheet: React.FC<PointsSheetProps> = ({
  open,
  title,
  description,
  mainImage,
  mainImageAlt,
  mainImageClass = 'w-14 h-14',
  content,
  buttonText,
  buttonAction,
  onClose,
  isLoading = false
}) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side={'bottom'}
        className='rounded-t-[38px] border-t-0 bg-[#7dc5db] top-glow p-0 max-w-xl mx-auto'
        classNameIcon='right-4 top-5 focus:ring-0'
        isHiddenClose
        aria-describedby='sheet-sync-points'
      >
        <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
          <div className='bg-[#272a2f] py-8 px-6 rounded-3xl relative mt-8'>
            <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full p-2'>
              <div className='bg-[#272a2f] rounded-full w-full h-full flex items-center justify-center'>
                <img src={mainCharacter} alt='Main Character' className='w-[80%] h-[80%]' />
              </div>
            </div>
            <SheetHeader className='mt-4'>
              <SheetTitle className='flex justify-center items-center gap-3 '>
                <img src={mainImage || hamsterCoin} alt={mainImageAlt} className={mainImageClass} />
                <span className='text-[32px] text-white font-extrabold font-jetbrains text-gradient'>{title}</span>
              </SheetTitle>
            </SheetHeader>
            {content}
            <SheetDescription className='text-center text-white pt-6 font-semibold text-base'>
              {description}
            </SheetDescription>
          </div>
          <div className='mt-3'>
            <button
              className='flex-1 bg-gradient-to-b from-[#749099] to-[#7dc5db] h-[66px] w-full flex justify-center rounded-2xl focus:ring-0 border-none outline-none'
              onClick={buttonAction}
              disabled={isLoading}
            >
              <p className='flex items-center justify-center font-bold text-base text-white leading-[66px]'>
                {isLoading && (
                  <svg className='animate-spin h-5 w-5 mr-3 stroke-white' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                )}
                {isLoading ? 'Receiving...' : buttonText}
              </p>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default PointsSheet
