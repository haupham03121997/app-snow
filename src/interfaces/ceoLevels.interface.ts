export interface AddCeoLevelRequest {
  name: string
  points_from: number
  points_to: number
}

export interface DataCeoLevelResponse {
  data: Datum[]
}

export interface Datum {
  name: string
  points_from: string
  points_to: null | string
  users: User[]
}

export interface User {
  telegram_id: number
  telegram_username: string
  telegram_firstname: string
  telegram_lastname: null
  points: string
}
