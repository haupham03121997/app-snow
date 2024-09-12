export interface AddCardGroupRequest {
  name: string
}

export interface CardGroupResponse {
  data: Datum[]
  total: number
}

export interface Datum {
  id: string
  name: string
}
