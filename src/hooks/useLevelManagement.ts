import { useEffect, useState } from 'react'

const useLevelManagement = (points: number, levelMinPoints: number[], levelNames: string[]): number => {
  const [levelIndex, setLevelIndex] = useState(6)

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex]
    const nextLevelMin = levelMinPoints[levelIndex + 1]
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1)
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1)
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length])

  return levelIndex
}

export default useLevelManagement
