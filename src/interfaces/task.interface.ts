export interface DataTask {
  data: Datum[]
  total: number
}

export interface Datum {
  id: string
  name: string
  social_type_id: number
  social_info: string
  coins: string
  started: boolean
  claimed: boolean
}
