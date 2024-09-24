import { useStore } from '@stores'
import { useEffect } from 'react'

const usePointsIncrement = () => {
  const { setPoints, mining } = useStore((state) => state)
  const profitPerHour = Number(mining?.profit_per_hour || 0)
  useEffect(() => {
    const pointsPerSecond = profitPerHour / 3600
    const points = Number(mining?.points || 0)
    const interval = setInterval(() => {
      const totalPoints = points + pointsPerSecond
      setPoints(totalPoints)
    }, 1000)
    return () => clearInterval(interval)
  }, [profitPerHour, mining, setPoints])
}

export default usePointsIncrement
