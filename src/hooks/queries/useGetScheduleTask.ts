import { taskApi } from '@apis/task.api'
import { QueryKeys } from '@constants/queryKeys'
import { DataSchedule } from '@interfaces/schedule.interface'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetSchedule = Omit<UseQueryOptions<DataSchedule>, 'queryKey' | 'queryFn'>

const useGetScheduleTask = (options?: UseGetSchedule) => {
  const queryResult = useQuery({
    queryKey: [QueryKeys.SCHEDULE_TASK],
    queryFn: () => taskApi.getSchedule(),
    ...options
  })
  return queryResult
}

export default useGetScheduleTask
