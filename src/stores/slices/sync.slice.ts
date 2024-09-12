import { StateCreator } from 'zustand'

import { DataSync } from '@interfaces/sync.interface'

type SyncState = {
  dataSync: DataSync | null
  isShowSheetSync: boolean
}

type SyncActions = {
  setSyncData: (data: DataSync) => void
  setShowSheetSync: (isShowSheetSync: boolean) => void
}

export type SyncStore = SyncState & SyncActions

const initialState: SyncState = {
  dataSync: null,
  isShowSheetSync: false
}

const syncSlice: StateCreator<SyncStore> = (set) => {
  return {
    ...initialState,
    setSyncData: (dataSync) => set(() => ({ dataSync })),
    setShowSheetSync: (isShowSheetSync) => set(() => ({ isShowSheetSync }))
  }
}

export default syncSlice
