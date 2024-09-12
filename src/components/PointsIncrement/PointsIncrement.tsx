import { usePointsIncrement } from '@hooks'
import { memo } from 'react'

const PointsIncrement = () => {
  usePointsIncrement()

  return null
}

export default memo(PointsIncrement)
