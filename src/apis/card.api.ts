import { AxiosError } from 'axios'
import fetcher from './fetcher'

export const cardApi = {
  buyCard: async (idCard: string, levelCanBuy: number) => {
    try {
      const response = await fetcher.post<any>(`/card/${idCard}/buy/${levelCanBuy}`, {})
      return response.data
    } catch (error: any) {
      console.log('error buyCard', (error as AxiosError).response)
      throw error
    }
  }
}