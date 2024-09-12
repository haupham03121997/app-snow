import { StateCreator } from 'zustand'

import { Combo } from '@interfaces/mining.interface'

type ComboState = {
  combo: Combo | null
}

type ComboActions = {
  setCombo: (combo: Combo) => void
}

export type ComboStore = ComboState & ComboActions

const initialState: ComboState = {
  combo: null
}

const comboSlice: StateCreator<ComboStore> = (set) => {
  return {
    ...initialState,
    setCombo: (combo) => set(() => ({ combo }))
  }
}

export default comboSlice
