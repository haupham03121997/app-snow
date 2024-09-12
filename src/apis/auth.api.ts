import { AxiosResponse } from 'axios'

import { DataEnergy } from '@interfaces/energy.interface'
import { DataTask } from '@interfaces/task.interface'

import { DataMining } from '@interfaces/mining.interface'
import { AuthenticateRequest, AuthenticateResponse, CurrentUser, DataCardAuth } from '@interfaces/user.interface'
import fetcher from './fetcher'

export const authApi = {
  authenticate: async (bodyRequest: AuthenticateRequest) => {
    try {
      const response = await fetcher.post<AuthenticateRequest, AxiosResponse<AuthenticateResponse>>(
        'auth/authenticate',
        {
          ...bodyRequest
        }
      )

      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getCurrentUserInfo: async () => {
    try {
      const response = await fetcher.get<CurrentUser>('/auth/info')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getEnergy: async () => {
    try {
      const response = await fetcher.get<DataEnergy>('/auth/energy')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getTask: async () => {
    try {
      const response = await fetcher.get<DataTask>('/auth/task')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getCard: async () => {
    try {
      const response = await fetcher.get<DataCardAuth>('/auth/card')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getMining: async () => {
    try {
      const response = await fetcher.get<DataMining>('/auth/mining')
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
