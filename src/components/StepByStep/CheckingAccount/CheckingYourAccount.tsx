import { useEffect, useState } from 'react'
import React from 'react'
import './index.css'

const CheckingYourAccount: React.FC = () => {
  const listCheck = [
    {
      title: 'Account age verified',
      isCheck: false
    },
    {
      title: 'Telegram Premium check',
      isCheck: false
    }
  ]
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 5000)
  }, [])

  // const listCheck = (isLoading: any) => (
  //   <div>
  //     <p>Account age verified</p>
  //     <div className='checkbox'>
  //       <input type='checkbox' id='myCheckbox' className='sr-only' />
  //       <label htmlFor='myCheckbox' className='checkbox-label'>
  //         <div className='outer-circle'></div>
  //         <div className='inner-circle'></div>
  //         <div className={!isLoading ? 'progress-ring ' : 'stop-animation'}></div>
  //       </label>
  //     </div>
  //   </div>
  // )
  return (
    <div className='splash-container !text-white'>
      <h1 className='!text-white absolute  top-[10%] -translate-y-1/2 text-[24px] font-semibold'>
        Checking Your Account
      </h1>

      <div className='absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col'>
        <div className='grid grid-cols-2 gap-2 justify-center w-[75%]'>
          {listCheck.map((i) => (
            <div className='grid justify-center text-center'>
              <p>{i.title}</p>
              <div className='inline-flex justify-center'>
                <div className='checkbox'>
                  <input type='checkbox' id='myCheckbox' className='sr-only' />
                  <label htmlFor='myCheckbox' className='checkbox-label'>
                    <div className='outer-circle'></div>
                    <div className='inner-circle'></div>
                    <div className={!isLoading ? 'progress-ring ' : 'stop-animation'}></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CheckingYourAccount
