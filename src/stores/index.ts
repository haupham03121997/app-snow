import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import userSlice from './slices/auth.slice'
import comboSlice from './slices/combo.slice'
import globalSlice from './slices/global.slice'
import miningSlice from './slices/mining.slice'
import syncSlice from './slices/sync.slice'

type StoreState = ReturnType<typeof userSlice> &
  ReturnType<typeof miningSlice> &
  ReturnType<typeof comboSlice> &
  ReturnType<typeof syncSlice> &
  ReturnType<typeof globalSlice>

export const useStore = create<StoreState>()(
  devtools((...options) => ({
    ...userSlice(...options),
    ...miningSlice(...options),
    ...comboSlice(...options),
    ...syncSlice(...options),
    ...globalSlice(...options)
  }))
)
