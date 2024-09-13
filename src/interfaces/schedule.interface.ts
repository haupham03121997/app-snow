export interface DataSchedule {
  data: ScheduleItem[]
  total: number
}

export interface ScheduleItem {
  day_id: number
  rewards: number
  checked: boolean
  today?: boolean
}
