import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { authApi } from '@apis/auth.api'
import { AuthenticateRequest } from '@interfaces/user.interface'
import { useStore } from '@stores'
import { getLocalStorage } from '@utils'

const useGetToken = () => {
  const { setToken } = useStore((state) => state)
  const telegramId = getLocalStorage('telegram_id')
  const telegramUsername = getLocalStorage('telegram_username')
  const telegram_firstname = getLocalStorage('telegram_firstname')
  const telegram_lastname = getLocalStorage('telegram_lastname')
  const user_type_id = getLocalStorage('user_type_id')

  const bodyRequest: AuthenticateRequest = {
    telegram_id: telegramId ? Number(telegramId) : 687612678,
    telegram_username: telegramUsername || 'nhut2236',
    telegram_firstname: telegram_firstname || 'Bob',
    telegram_lastname: telegram_lastname,
    user_type_id: user_type_id || '66cd789afd78c74aec2ef99e'
  }

  const mutateResult = useMutation({
    mutationFn: (bodyRequest: AuthenticateRequest) => authApi.authenticate(bodyRequest),
    onSuccess: (data) => {
      const token = data?.token
      setToken(token)
    }
  })

  useEffect(() => {
    mutateResult.mutate(bodyRequest)
  }, [])

  return mutateResult
}

export default useGetToken
