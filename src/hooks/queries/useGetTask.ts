import { authApi } from '@apis/auth.api'
import { DataTask } from '@interfaces/task.interface'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetTask = Omit<UseQueryOptions<DataTask>, 'queryKey' | 'queryFn'>

const useGetTask = (options?: UseGetTask) => {
  const queryResult = useQuery({
    queryKey: ['tasks'],
    queryFn: () => authApi.getTask(),
    ...options
  })
  return queryResult
}

export default useGetTask
