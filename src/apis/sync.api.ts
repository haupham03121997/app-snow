import { DataSync } from '@interfaces/sync.interface'
import fetcher from './fetcher'

export const syncApi = {
  getSync: async () => {
    try {
      const response = await fetcher.get<DataSync>(`/user-sync`)
      return response.data
    } catch (error: any) {
      throw error
    }
  },
  postSync: async (payload: { points: number; energy: number }) => {
    console.log({ payload })
    try {
      const response = await fetcher.post<any>(`/user-sync`, payload)
      return response.data
    } catch (error: any) {
      throw error
    }
  }
}
