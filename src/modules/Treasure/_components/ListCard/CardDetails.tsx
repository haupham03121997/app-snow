import { Lock } from 'lucide-react'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

import { cardApi } from '@apis/card.api'
import { hamsterCoin, mainCharacter, snowManV1 } from '@assets/images'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet'
import { ConditionType } from '@constants/conditionType'
import { QueryKeys } from '@constants/queryKeys'
import { CardItem } from '@interfaces/user.interface'
import { cn } from '@lib/utils'
import { useStore } from '@stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatProfitPerHour } from '@utils'

interface CardDetailsProps {
  card: CardItem
}

const renderDependOnAnotherCard = (card: CardItem) => (
  <span>
    {card.depend_on_card_name} lvl {card.depend_on_card_level}
  </span>
)

const renderInviteFriends = (card: CardItem) => <span>Invite {card.friends_amount} friends</span>

const renderUnlockedCard = (card: CardItem) => (
  <div className='flex items-center gap-1'>
    <img src={hamsterCoin} alt='coin' className='w-4 h-4' />
    {formatProfitPerHour(Number(card.level_coins || 0))}
  </div>
)

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  const [isLocked, setIsLocked] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const queryClient = useQueryClient()

  const { setDisabledPoints, mining } = useStore((state) => state)

  const { mutateAsync: mutateBuyCard } = useMutation({
    mutationFn: (payload: { idCard: string; levelCanBuy: number }) =>
      cardApi.buyCard(payload.idCard, payload.levelCanBuy),

    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.AUTH_MINING],
        type: 'active'
      })
      queryClient.refetchQueries({
        queryKey: [QueryKeys.AUTH_CARD],
        type: 'active'
      })
      setTimeout(() => {
        setIsOpen(false)
        setDisabledPoints(false)
        setIsLoading(false)
      }, 500)
    }
  })

  useEffect(() => {
    setIsLocked(!!(card.locked || card.at_level_maximum || Number(card.level_coins) > Number(mining?.points)))
  }, [card])

  const handleBuyCard = async () => {
    setDisabledPoints(true)
    setIsLoading(true)
    const promise = mutateBuyCard({ idCard: card.id, levelCanBuy: card.level_can_buy || 0 })

    toast.promise(
      promise,
      {
        loading: 'Requesting...',
        success: `Upgrade is yours!. ${card.name} level ${card.level_can_buy || 0}`,
        error: 'Network error. Please try again'
      },
      {
        position: 'top-center'
      }
    )
    await promise
  }
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (isLocked) return
        if (isLoading) {
          setIsOpen(true)
        } else {
          setIsOpen(open)
        }
      }}
    >
      <SheetTrigger asChild>
        <div
          key={card.id}
          className={cn('rounded-lg  bg-black px-2 py-3 overflow-hidden flex flex-col gap-3 relative ', {
            'bg-black': !isLocked
          })}
        >
          {isLocked && (
            <>
              <div className='w-full h-full absolute left-0 top-0 bg-black opacity-70 z-0'></div>
              <div
                className={cn(
                  'absolute flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full text-gray-500'
                )}
              >
                <div className='w-[80px] h-[80px] rounded-full bg-[#25252573] flex items-center justify-center'>
                  <Lock size={20} />
                </div>
              </div>
            </>
          )}
          <div className='flex gap-2'>
            <img src={snowManV1} className='w-8 h-8 rounded-full' alt='whale' />
            <div className='flex flex-col gap-2 flex-1'>
              <h3 className='text-sm text-gray-300 text-start'>{card.name}</h3>
              <p className='text-xs text-gray-500  text-start'>Profit per hour</p>
              <div className='flex items-center gap-1'>
                <img src={hamsterCoin} alt='coin' className='w-4 h-4' />
                <span className='text-gray-500 text-xs'>
                  {formatProfitPerHour(Number(card.level_profit_per_hour || 0))}
                </span>
              </div>
            </div>
          </div>
          <div className='h-[1.5px] bg-gray-700'></div>
          <div className='flex items-center divide-x divide-gray-700'>
            <p className='text-gray-500 text-xs w-10 text-center'>Lvl {card.level_can_buy || 0}</p>
            <div className='flex items-center gap-1 pl-2'>
              <span className='text-gray-500 text-xs'>
                {card.at_level_maximum ? (
                  'Max level'
                ) : (
                  <>
                    {card.locked &&
                      card.condition_type_id === ConditionType.DEPEND_ON_ANOTHER_CARD &&
                      renderDependOnAnotherCard(card)}
                    {card.locked && card.condition_type_id === ConditionType.INVITE && renderInviteFriends(card)}
                    {!card.locked && renderUnlockedCard(card)}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        side={'bottom'}
        className='rounded-t-[38px] border-t-0 bg-[#7dc5db]  top-glow p-0'
        classNameIcon='right-4 top-5 focus:ring-0 '
        aria-describedby='sheet-card-details'
      >
        <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
          <div className='bg-[#272a2f] py-8 px-6 rounded-3xl relative mt-8'>
            <SheetHeader className='mt-4'>
              <SheetTitle className='flex justify-center items-center gap-3 '>
                <img src={hamsterCoin} alt='coin' className='w-14 h-14' />
                <span className='text-[32px] text-white font-bold'>
                  {formatProfitPerHour(Number(card.level_profit_per_hour || 0), true)}
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black  rounded-full p-2'>
              <div className='bg-[#272a2f] rounded-full'>
                <img src={mainCharacter} alt='Main Character' className='w-full h-full' />
              </div>
            </div>
            <SheetDescription className='text-center text-white pt-6 font-semibold text-base'>
              The exchange has started working for you.
            </SheetDescription>
          </div>
          <div className='mt-3'>
            <button
              className='flex-1 bg-gradient-to-b from-[#D3BA40]  to-[#F9A208] h-[66px] w-full flex justify-center rounded-2xl'
              onClick={handleBuyCard}
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
                Go ahead
              </p>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CardDetails
