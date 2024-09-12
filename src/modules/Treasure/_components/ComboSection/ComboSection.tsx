import numeral from 'numeral'
import React, { memo } from 'react'

import { cn } from '@lib/utils'
import { useStore } from '@stores'

import { ComboCard } from '../ComboCard'
import { LuckyCard } from '../LuckyCard'

const ComboSection: React.FC = () => {
  const { combo } = useStore((state) => state)

  const luckyCard = combo
    ? [
        {
          isShow: combo?.first_card_show,
          card: combo?.first_card
        },
        {
          isShow: combo?.second_card_show,
          card: combo?.second_card
        },
        {
          isShow: combo?.third_card_show,
          card: combo?.third_card
        }
      ]
    : []

  console.log('luckyCard', luckyCard)

  return (
    <>
      <ComboCard title='Daily combo' value={`+ ${numeral(combo?.coins).format('0,0')}`} />
      <div className={cn('grid grid-cols-3 gap-4')}>
        {luckyCard.map((item) => (
          <LuckyCard key={item.card?.id} isShow={item.isShow} card={item.card} />
        ))}
      </div>
    </>
  )
}

export default memo(ComboSection)
