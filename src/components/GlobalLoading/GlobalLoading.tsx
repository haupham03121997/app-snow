import { useLottie } from 'lottie-react'
import React, { memo, useEffect } from 'react'
import coinsData from '../../lotties/coins.json'
import diamondData from '../../lotties/diamond.json'

import { mainCharacter } from '@assets/images'
import { useStore } from '@stores'
import { convertAgeToPoints } from '@utils'
import { CalendarCheck } from 'lucide-react'
import './index.css'

const optionsDiamond = {
  animationData: diamondData,
  loop: true,
  heigh: 10,
  style: {
    width: '40px',
    height: '100%'
  }
}

const DURATION = 5000 // 5s

const GlobalLoading: React.FC = () => {
  const { setGlobalLoading, ageAccount } = useStore((state) => state)
  const [processValue, setProcessValue] = React.useState(0)
  React.useEffect(() => {
    const targetValue = 98
    const increment = (targetValue - processValue) / (DURATION / 100) // increment per 100ms

    const interval = setInterval(() => {
      setProcessValue((prev) => {
        if (prev >= targetValue) {
          clearInterval(interval)
          return targetValue
        }
        return prev + increment
      })
    }, 100)

    return () => clearInterval(interval)
  }, [processValue])
  const options = {
    animationData: coinsData,
    loop: true,
    heigh: 200
  }

  useEffect(() => {
    return () => {
      setGlobalLoading(false)
    }
  }, [])

  const { View } = useLottie(options)
  const { View: ViewDiamond } = useLottie(optionsDiamond)

  return (
    <div className='splash-container'>
      <div className='absolute  top-[20%] -translate-y-1/2'>{View}</div>
      <div className='absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[9999] flex items-center flex-col'>
        <img src={mainCharacter} className='w-2/4' />

        <div className='gradient-cards w-full'>
          <div className='car w-full'>
            <div className='container-card bg-green-box w-full'>
              <div className='w-full flex items-center justify-center relative'>
                <div className='w-auto h-auto relative'>
                  <div className='absolute  z-40 w-full h-full flex items-center justify-center'>{ViewDiamond}</div>
                  <div className='relative z-10'>
                    <svg width={60} height={60} viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <rect
                        x={1}
                        y={1}
                        width={118}
                        height={118}
                        rx={24}
                        fill='url(#paint0_linear_1366_4547)'
                        fillOpacity='0.15'
                        stroke='url(#paint1_radial_1366_4547)'
                        strokeWidth={2}
                      />

                      <defs>
                        <linearGradient
                          id='paint0_linear_1366_4547'
                          x1='0.0063367'
                          y1='0.168432'
                          x2='120.853'
                          y2='119.009'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stopColor='#2FCB89' stopOpacity='0.7' />
                          <stop offset='0.489583' stopColor='#2FCB89' stopOpacity={0} />
                          <stop offset={1} stopColor='#2FCB89' stopOpacity='0.7' />
                        </linearGradient>
                        <radialGradient
                          id='paint1_radial_1366_4547'
                          cx={0}
                          cy={0}
                          r={1}
                          gradientUnits='userSpaceOnUse'
                          gradientTransform='translate(60 60) rotate(96.8574) scale(122.674 149.921)'
                        >
                          <stop stopColor='#54E8A9' />
                          <stop offset={1} stopColor='#1A3E31' stopOpacity='0.2' />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              <p className='text-center pt-6 pb-4 text-4xl font-bold font-jetbrains text-gradient'>
                {convertAgeToPoints(ageAccount || 0)}
              </p>
              <p className='text-center text-white text-lg'>
                The points you received after{' '}
                <span className='font-jetbrains text-xl font-semibold'>
                  {ageAccount || 0 < 1 ? 'under 1 year' : `${ageAccount} year${ageAccount || 0 > 1 ? 's' : ''}`}
                </span>{' '}
                of joining Telegram.
              </p>
            </div>
          </div>
        </div>
        <div className='card px-8'>
          <div className='container-card bg-white-box w-full'>
            <div className='flex items-center justify-center w-full h-full'>
              <div className='w-auto h-auto relative'>
                <div className='absolute top-1/2 -translate-y-1/2 left-1/2  -translate-x-1/2'>
                  {' '}
                  <CalendarCheck className='text-[#b0afb0]' />
                </div>
                <svg width={60} height={60} viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <rect
                    x={1}
                    y={1}
                    width={118}
                    height={118}
                    rx={24}
                    fill='url(#paint0_linear_1366_4565)'
                    fillOpacity='0.15'
                    stroke='url(#paint1_radial_1366_4565)'
                    strokeWidth={2}
                  />

                  <defs>
                    <linearGradient
                      id='paint0_linear_1366_4565'
                      x1={0}
                      y1={0}
                      x2={120}
                      y2={120}
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='white' stopOpacity='0.7' />
                      <stop offset='0.505208' stopColor='white' stopOpacity={0} />
                      <stop offset={1} stopColor='white' stopOpacity='0.7' />
                    </linearGradient>
                    <radialGradient
                      id='paint1_radial_1366_4565'
                      cx={0}
                      cy={0}
                      r={1}
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(60 60) rotate(96.8574) scale(122.674 149.921)'
                    >
                      <stop stopColor='white' />
                      <stop offset={1} stopColor='#363437' stopOpacity='0.2' />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className='mt-4 text-center text-white '>
              <p className='text-4xl font-extrabold text-[#C79B00] pt-6 pb-4 font-jetbrains text-gradient'>
                December 24th!
              </p>
              <p className='text-center text-white text-lg'>Mark your calendar for Snow Man's Listing</p>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-4 left w-full px-8'>
        <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full mt-8'>
          <div className='progress-gradient h-2 rounded-full' style={{ width: `${processValue}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default memo(GlobalLoading)
