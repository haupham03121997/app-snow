import React, { memo, useEffect } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useGetAuthCards } from '@hooks'
import CardDetails from './CardDetails'
import ListCardSkeleton from './ListCardSkeleton'

const ListCard: React.FC = () => {
  const [selected, setSelected] = React.useState('')
  const { data: dataCards, isLoading } = useGetAuthCards()

  useEffect(() => {
    if (!isLoading && dataCards && dataCards?.data.length > 0) {
      setSelected(dataCards.data[0].id)
    }
  }, [dataCards])

  const handleTabChange = (value: string) => {
    setSelected(value)
  }

  return (
    <>
      {isLoading && <ListCardSkeleton />}
      {!isLoading && dataCards && dataCards?.data?.length > 0 && (
        <Tabs value={selected} className='w-full pb-24' onValueChange={handleTabChange}>
          <TabsList className='bg-[#272a2f] grid grid-cols-4 gap-2 h-auto p-1'>
            {dataCards.data.map((item) => (
              <TabsTrigger key={`tab-list-${item.id}`} value={item.id}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {dataCards.data.map((item) => (
            <TabsContent value={item.id} key={`tab-content-${item.id}`}>
              <div className='grid grid-cols-2 gap-3'>
                {item.cards.map((card) => (
                  <CardDetails key={card.id} card={card} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  )
}

export default memo(ListCard)
