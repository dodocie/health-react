import {
  VendorIds, VendorIdsUI
}          from 'src/config/vendorConfig'
// import { BonusInfo} from 'src/hooks/bonus/defineBonus'
// import {ItemSummary}        from 'src/hooks/bonus/creater'

export type Branch = {
  hospitalName: string
  hospitalCode: string
  hospitalAddress: string
  appointmentDate: string
  vendorid: VendorIds
  vid_UI: VendorIdsUI
  excludeItems?: NA_ItemType[]
  schedules: Schedule[]
  timespan: string
  bookingLine: string
  supportingLine: string
  city: string
  province: string
  vipTag?: string
  loc: {
    type: string
    coordinates: [number, number]
  },
  workTime?: string
}

export type StoreBranch = Omit<Branch, 'vid_UI' | 'schedules'>

export type Schedule = {
  date: string
  capacity: number
  timespan?: string
  limit: number
  intervals?: {capacity: number, timespan: string}[]
  vipIcon?: boolean
}

export type VipScheduleInBonus = {
  date: string
  hospitalCode: string
}

export type BranchCode = string

export type CityPicked = {
  province: string
  city: string
}

export type AddressInfo = {
  province: string
  city: string
  vendorids: VendorIds[]
} | {
  hospitalCode: string
  vendorids: VendorIds[]
}

export type PickerUsage = 'pickBranch' | 'research' | 'filter'  | 'pickDate' | 'pickCity' | 'briefList' //'promotion' 'briefDialog' 改为pickCity
export type PickerPage = 'branch' | 'city' | 'calendar' | 'attention' | 'briefBranch' | 'searchBranch' | 'budget'

export type Suppliers = Array<VendorIds>
export type SuppliersUI = Array<VendorIdsUI>

export enum HosKeyMap {
  name            = 'hospitalName',
  code            = 'hospitalCode',
  address         = 'hospitalAddress',
  vendorid        = 'vendorid',
  appointmentDate = 'appointmentDate',
  timespan        = 'timespan',
  province        = 'province',
  city            = 'city',
  bookingLine     = 'bookingLine',
  supportingLine  = 'supportingLine',
  loc  = 'loc',
}

export type Hospital = {
  vendorid: VendorIds
  code: string
  name: string
  address: string
  appointmentDate: string
  timespan: string
  bookingLine: string
  supportingLine: string
  city: string
  province: string
  loc: {
    type: string
    coordinates: [number, number]
  }
  workTime?: string
}

export type NA_ItemType = {
  name: string
  id: string
  conditions?: string[]
}
export type NA_ITEMMapVal = {
  name: string
  items: NA_ItemType[]
}

// export type Package4Branch = { items: ItemSummary[], info?: BonusInfo }
// export type BranchPackMap = {
//   [k in VendorIds]?: Package4Branch
// }
export type VendorIdsMap = {
  [k in VendorIds]?: string[]
}
