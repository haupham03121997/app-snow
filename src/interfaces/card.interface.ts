export interface DataCard {
  data: Datum[]
  total: number
}

export interface Datum {
  id: string
  name: string
  cards: Card[]
}

export interface Card {
  id: string
  name: string
  condition_type_id: number
  locked: boolean
  level_can_buy?: number
  depend_on_card_id?: string
  depend_on_card_level?: number
  friends_amount?: number
  invited_friends?: number
}
