export interface ModalGCode {
  group: string
  flag: string
  code: string
}

export interface ModalData {
  code: string
  commanded: boolean
}

export interface OtherData {
  type: string
  aux_data: number
  inputs: number
  is_negative: boolean
  has_decimal: boolean
  commanded: boolean
  decimal: number
}

export interface CNCState {
  id: string
  feed_rate_unit: string
  speed: number
  feed_rate: number
  modal_gcode: ModalGCode[]
  modal_data: ModalData[]
  one_shot_data: ModalData[]
  other_data: OtherData[]
  timestamp: string
}
