import React, { memo } from 'react'

import { TaskItem } from '@interfaces/task.interface'
import { TaskItemList } from '../TaskItemList'
import { TaskSkeleton } from '../TaskSkeleton'

interface ListTaskProps {
  data: TaskItem[]
  isLoading: boolean
}

const ListTask: React.FC<ListTaskProps> = ({ data, isLoading }) => {
  return (
    <>
      {isLoading && <TaskSkeleton keyName='list-task' size={3} />}
      {!isLoading &&
        data?.filter((_) => _.social_type_id != 1).map((task: TaskItem) => <TaskItemList task={task} key={task.id} />)}
    </>
  )
}

export default memo(ListTask)
