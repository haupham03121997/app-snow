import { AddCeoLevelRequest, DataCeoLevelResponse } from '@interfaces/ceoLevels.interface'
import fetcher from './fetcher'

export const ceoLevelsApi = {
  addCeoLevels: async (bodyRequest: AddCeoLevelRequest) => {
    try {
      const response = await fetcher.post<AddCeoLevelRequest, any>('/ceo-level', {
        ...bodyRequest
      })

      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getCeoLevels: async () => {
    try {
      const response = await fetcher.get<DataCeoLevelResponse>('/ceo-level')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  }
}
