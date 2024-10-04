import React, { memo, useRef, useState } from 'react'

import { Sheet, SheetContent } from '@components/ui/sheet'
import { useGetClaim } from '@hooks'
import { TaskItem } from '@interfaces/task.interface'
import { TaskContent } from '../TaskContent'
import { TaskItemList } from '../TaskItemList'
import { TaskSkeleton } from '../TaskSkeleton'

interface ListTaskProps {
  data: TaskItem[]
  isLoading: boolean
}

const ListTask: React.FC<ListTaskProps> = ({ data, isLoading }) => {
  const idRef = useRef<string>('')

  const [isShow, setIsShow] = useState(false)
  const [status, setIsStatus] = useState(false)

  const queryResult = useGetClaim(idRef.current, {
    enabled: status
  })

  const getClaimIsLoading = queryResult.isLoading

  const clickShowDialog = (value: boolean) => {
    !value && setIsStatus(false)
    setIsShow(value)
  }

  const checkClaim = (id: string) => {
    idRef.current = id
    setIsStatus(true)
  }

  return (
    <>
      {isLoading && <TaskSkeleton keyName='list-task' size={3} />}
      {!isLoading &&
        data?.map((task: TaskItem) => (
          <Sheet key={task.id}>
            <TaskItemList isShow={isShow} task={task} />
            <SheetContent
              onInteractOutside={(e) => e.preventDefault()}
              side={'bottom'}
              className='rounded-t-[38px] border-t-0 bg-[#7dc5db] top-glow p-0 text-white'
              classNameIcon='right-4 top-5 focus:ring-0 '
            >
              <TaskContent
                task={task}
                clickShowDialog={clickShowDialog}
                isShow={isShow}
                checkClaim={checkClaim}
                getClaimIsLoading={getClaimIsLoading}
                setIsShow={setIsShow}
              />
            </SheetContent>
          </Sheet>
        ))}
    </>
  )
}

export default memo(ListTask)
