import { AddCardGroupRequest, CardGroupResponse } from '@interfaces/cardGroup.interface'
import fetcher from './fetcher'

export const cardGroupApi = {
  addCardGroup: async (bodyRequest: AddCardGroupRequest) => {
    try {
      const response = await fetcher.post<AddCardGroupRequest, any>('/card-group', {
        ...bodyRequest
      })

      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getCardGroup: async () => {
    try {
      const response = await fetcher.get<CardGroupResponse>('/card-group')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  }
}
