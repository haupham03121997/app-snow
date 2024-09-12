export interface DataMining {
  mining: Mining
  combo: Combo
}

export interface Combo {
  id: string
  coins: string
  first_card_id: string
  first_card: Card
  first_card_show: boolean
  second_card_id: string
  second_card: Card
  second_card_show: boolean
  third_card_id: string
  third_card: Card
  third_card_show: boolean
  can_claim: boolean
}

export interface Card {
  id: string
  name: string
}

export interface Mining {
  id: string
  user_id: string
  points: string
  profit_per_hour: string
  coins_per_tap: string
  coins_to_level_up: string
}
