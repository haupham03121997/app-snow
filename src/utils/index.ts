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
  if (!value) return null
  return JSON.parse(value)
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
