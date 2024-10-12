import React from 'react'
import './index.css'

interface ICheckingYourAccount {
  isLoading: boolean
  isLoadingPremium: boolean
}

const CheckingYourAccount: React.FC<ICheckingYourAccount> = ({ isLoading, isLoadingPremium }) => {
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

  return (
    <div className='splash-container !text-white'>
      <h1 className='!text-white absolute  text-4xl top-[10%] -translate-y-1/2  font-semibold px-8 text-center pt-14'>
        Checking Your Account
      </h1>

      <div className='absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col'>
        <div className='grid grid-cols-1 gap-8 justify-center w-[80%]'>
          {listCheck.map((item, index) => (
            <div className='grid justify-center text-center rounded-xl py-8 space-y-5 border border-[#7dc5db] block-verify-account'>
              <p className='text-xg font-bold'>{item.title}</p>
              <div className='inline-flex justify-center'>
                <div className='checkbox !w-10 !h-10 '>
                  <input type='checkbox' id='myCheckbox' className='sr-only !w-10 !h-10' />
                  <label htmlFor='myCheckbox' className='checkbox-label'>
                    <div className='outer-circle'></div>
                    <div className='inner-circle'></div>
                    {index === 0 && <div className={isLoading ? 'progress-ring' : 'stop-animation'}></div>}
                    {index === 1 && <div className={isLoadingPremium ? 'progress-ring' : 'stop-animation'}></div>}
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
