import React, { memo, useEffect, useState } from 'react'

interface CountDownProps {
  className?: string
}

// const DAY_TO_MILLISECONDS = 1000 * 60 * 60 * 24
const HOUR_TO_MILLISECONDS = 1000 * 60 * 60
const MINUTE_TO_MILLISECONDS = 1000 * 60
const SECOND_TO_MILLISECONDS = 1000

const CountDown: React.FC<CountDownProps> = ({ className }) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00')

  const calculateTimeLeft = () => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)

    const diff = midnight.getTime() - now.getTime()

    if (diff < 0) return '00:00:00'

    const hours = Math.floor(diff / HOUR_TO_MILLISECONDS)
    const minutes = Math.floor((diff % HOUR_TO_MILLISECONDS) / MINUTE_TO_MILLISECONDS)
    const seconds = Math.floor((diff % MINUTE_TO_MILLISECONDS) / SECOND_TO_MILLISECONDS)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft())
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span className={className}>{timeLeft}</span>
}

export default memo(CountDown)
