export interface DataCombo {
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
