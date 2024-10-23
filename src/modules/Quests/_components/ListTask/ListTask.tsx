import React from 'react'

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
      {!isLoading && data.map((task) => <TaskItemList task={task} key={task.id} />)}
    </>
  )
}

export default ListTask
