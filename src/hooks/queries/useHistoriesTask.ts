import { taskApi } from '@apis/task.api'
import { DataHistories } from '@interfaces/histories.interface'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetHistories = Omit<UseQueryOptions<DataHistories>, 'queryKey' | 'queryFn'>

const useGetHistoriesTask = (options?: UseGetHistories) => {
  const queryResult = useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskApi.getHistories(),
    ...options
  })
  return queryResult
}

export default useGetHistoriesTask
