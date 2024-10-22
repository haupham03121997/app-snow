import { beginCell } from '@ton/ton'
import { TonConnectUIError, UserRejectsError } from '@tonconnect/ui-react'

export const calculateProgress = (
  points: number,
  levelIndex: number,
  levelMinPoints: number[],
  levelNames: string[]
) => {
  if (levelIndex >= levelNames.length - 1) {
    return 100
  }
  const currentLevelMin = levelMinPoints[levelIndex]
  const nextLevelMin = levelMinPoints[levelIndex + 1]
  const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100
  return Math.min(progress, 100)
}

export const formatProfitPerHour = (profit: number, isHiddenPlusPrefix?: boolean) => {
  if (profit >= 1000000000) return `${!isHiddenPlusPrefix ? '+' : ''}${(profit / 1000000000).toFixed(2)}B`
  if (profit >= 1000000) return `${!isHiddenPlusPrefix ? '+' : ''}${(profit / 1000000).toFixed(2)}M`
  if (profit >= 1000) return `${!isHiddenPlusPrefix ? '+' : ''}${(profit / 1000).toFixed(1)}K`
  return `+${profit}`
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const setLocalStorage = <T = any>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = <T = any>(key: string): T | null => {
  const value = localStorage.getItem(key)
  try {
    if (!value) return null
    return JSON.parse(value)
  } catch {
    return value as any
  }
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

export const convertAgeToPoints = (age: number) => {
  if (age < 1) return 1000
  if (age >= 1 && age < 3) return 3000
  if (age) return 5000
  return 0
}

export const randomTime = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const isUserRejectAction = (e: unknown) => {
  if (e instanceof UserRejectsError) {
    return true
  }
}

export const isConnectUIError = (e: unknown) => {
  if (e instanceof TonConnectUIError) {
    return true
  }
}

export const transactionComment = (text: string) => {
  const cell = beginCell().storeUint(0x00000000, 32).storeStringTail(text).endCell()

  const boc = cell.toBoc()
  return boc.toString('base64')
}
