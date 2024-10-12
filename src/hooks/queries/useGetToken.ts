import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { authApi } from '@apis/auth.api'
import { AuthenticateRequest } from '@interfaces/user.interface'
import { useStore } from '@stores'
import { getLocalStorage } from '@utils'

const useGetToken = () => {
  const { setToken, setNewUser, setPremiumAccount, setAgeAccount, setIsVisible } = useStore((state) => state)
  const telegramId = getLocalStorage('telegram_id')
  const telegramUsername = getLocalStorage('telegram_username')
  const telegram_firstname = getLocalStorage('telegram_firstname')
  const telegram_lastname = getLocalStorage('telegram_lastname')
  const user_type_id = getLocalStorage('user_type_id')
  const is_premium = getLocalStorage('is_premium')

  const bodyRequest: AuthenticateRequest = {
    telegram_id: telegramId ? Number(telegramId) : 6387347744,
    telegram_username: telegramUsername,
    telegram_firstname: telegram_firstname,
    telegram_lastname: telegram_lastname,
    user_type_id: user_type_id,
    is_premium: is_premium || false
  }

  const mutateResult = useMutation({
    mutationFn: (bodyRequest: AuthenticateRequest) => authApi.authenticate(bodyRequest),
    onSuccess: (data) => {
      const token = data?.token
      const isNewUser = data?.is_new_user || false
      const age = data?.age || 0
      const isPremium = data?.is_premium || false
      if (age) setAgeAccount(age)
      if (isNewUser) setIsVisible(true)
      setPremiumAccount(isPremium)
      setNewUser(isNewUser)
      setToken(token)
    }
  })

  useEffect(() => {
    mutateResult.mutate(bodyRequest)
  }, [])

  return mutateResult
}

export default useGetToken
