// BottomNavigationBar.jsx
import { memo, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { binanceLogo } from '@/assets/images'
import { syncApi } from '@apis/sync.api'
import { Coins, Friends, Mine } from '@assets/icons'
import { QueryKeys } from '@constants/queryKeys'
import { PATH } from '@routes/path'
import { useStore } from '@stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getLocalStorage, normalizePath } from '@utils'
import NavItem from './NavItem'

const TIMER = 10000

const BottomNavigationBar = () => {
  const { mining } = useStore((state) => state)
  const queryClient = useQueryClient()
  const [activeButton, setActiveButton] = useState<string | null>('fleet')
  const navigate = useNavigate()
  const location = useLocation()

  const mutate = useMutation({
    mutationFn: (points: number) => syncApi.postSync({ points, energy: 0 }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.AUTH_MINING],
        type: 'active'
      })
    }
  })

  const handleClick = (path: string, button: string) => {
    if (path === PATH.TREASURE) {
      const profitPerHour = Number(getLocalStorage('profitPerHour') || 0)
      const pointsPerSecond = profitPerHour / 3600
      const initialPoints = Number(getLocalStorage('initialPoints') || 0)
      const points = Number(mining?.points || 0) - initialPoints + pointsPerSecond
      mutate.mutate(points)
    }

    setActiveButton(button)
    navigate(path)
  }

  const getClassNames = (button: string) => {
    return `text-center text-[#85827d] w-1/5 m-1  p-2 ${activeButton === button ? 'rounded-2xl bg-[#1c1f24] text-[#C79B00]' : ''}`
  }

  const memoizedClassNames = useMemo(
    () => ({
      fleet: getClassNames('fleet'),
      treasure: getClassNames('treasure'),
      allies: getClassNames('allies'),
      quests: getClassNames('quests'),
      airdrop: getClassNames('airdrop')
    }),
    [activeButton]
  )

  useEffect(() => {
    const path = location.pathname
    if (path === '/') setActiveButton('fleet')
    else setActiveButton(normalizePath(path))
  }, [location])

  const navList = [
    {
      className: memoizedClassNames.fleet,
      onClick: () => handleClick('/', 'fleet'),
      icon: <img src={binanceLogo} alt='Fleet' className='w-8 h-8 mx-auto' />,
      label: 'Fleet'
    },
    {
      className: memoizedClassNames.treasure,
      onClick: () => handleClick('/treasure', 'treasure'),
      icon: <Mine className='w-8 h-8 mx-auto' />,
      label: 'Treasure'
    },
    {
      className: memoizedClassNames.allies,
      onClick: () => handleClick('/allies', 'allies'),
      icon: <Friends className='w-8 h-8 mx-auto' />,
      label: 'Allies'
    },
    {
      className: memoizedClassNames.quests,
      onClick: () => handleClick('/quests', 'quests'),
      icon: <Coins className='w-8 h-8 mx-auto' />,
      label: 'Quests'
    },
    // {
    //   className: memoizedClassNames.airdrop,
    //   onClick: () => handleClick('/airdrop', 'airdrop'),
    //   icon: <img src={hamsterCoin} alt='Airdrop' className='w-8 h-8 mx-auto' />,
    //   label: 'Airdrop'
    // }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const profitPerHour = Number(getLocalStorage('profitPerHour') || 0)
      const points = Number(getLocalStorage('points') || 0)
      const initialPoints = Number(getLocalStorage('initialPoints') || 0)

      const pointsPerSecond = (profitPerHour / 3600) * 5

      const pointsValue = points - initialPoints + pointsPerSecond

      mutate.mutate(pointsValue)
    }, TIMER)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs'>
      {navList.map((navItem, index) => (
        <NavItem
          key={index}
          className={navItem.className}
          onClick={navItem.onClick}
          icon={navItem.icon}
          label={navItem.label}
        />
      ))}
    </div>
  )
}

export default memo(BottomNavigationBar)
