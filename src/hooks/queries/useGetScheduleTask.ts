import { taskApi } from '@apis/task.api'
import { DataSchedule } from '@interfaces/schedule.interface'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetSchedule = Omit<UseQueryOptions<DataSchedule>, 'queryKey' | 'queryFn'>

const useGetScheduleTask = (options?: UseGetSchedule) => {
  const queryResult = useQuery({
    queryKey: ['schedule-task'],
    queryFn: () => taskApi.getSchedule(),
    ...options
  })
  return queryResult
}

export default useGetScheduleTask
