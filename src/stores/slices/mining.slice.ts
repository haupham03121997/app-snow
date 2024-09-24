import { StateCreator } from 'zustand'

import { Mining } from '@interfaces/mining.interface'
import { setLocalStorage } from '@utils'

type MiningState = {
  initialPoints: number
  mining: Mining | null
  isDisabledPoints: boolean
}

type MiningActions = {
  setMining: (mining: Mining) => void
  setPoints: (points: number) => void
  setDisabledPoints: (isDisabledPoints: boolean) => void
}

export type MiningStore = MiningState & MiningActions

const initialState: MiningState = {
  mining: null,
  initialPoints: 0,
  isDisabledPoints: true
}

const miningSlice: StateCreator<MiningStore> = (set) => {
  return {
    ...initialState,
    setMining: (mining) =>
      set(() => {
        setLocalStorage('initialPoints', mining.points)
        setLocalStorage('profitPerHour', mining.profit_per_hour)
        return {
          mining,
          initialPoints: Number(mining.points)
        }
      }),
    setPoints: (points) =>
      set((state) => {
        if (state.mining && !state.isDisabledPoints) {
          setLocalStorage('points', JSON.stringify(points))
          return {
            mining: {
              ...state.mining,
              points: String(points)
            }
          }
        }
        return state
      }),
    setDisabledPoints: (isDisabledPoints) => set(() => ({ isDisabledPoints }))
  }
}

export default miningSlice
