

export type UserProfile = {
  gender: Gender
  marital?: Marital
}

export type Gender = 'male' | 'female'
export type Marital = 'married' | 'unmarried'

export const IDTypeAlias = {
  SFZ  : '身份证',
  JRZ  : '军人证',
  HZ   : '护照',
  GATXZ: '港澳居民来往内地通行证',
  QT   : '其它'
}
export type TypeOfIDFromServer = keyof typeof IDTypeAlias

export type ContactInfo = {
  customerName: string
  customerMobile: string
  customerID: string
  birthday?: string
  gender?: string
  marital?: string
  IDType: TypeOfIDFromServer
  relation: RelationKeys
}
export const relationMap = {
  self          : '本人',
  spouse        : '爱人',
  child         : '子女',
  parents       : '父母',
  otherRelatives: '其他亲人',
  friends       : '朋友'
} as const

export type RelationKeys = keyof typeof relationMap

export type ContactItem = {
  contactid: string
} & ContactInfo

export interface FormPickerType {
  IDType: {
    alias: TypeOfIDFromServer
    value: string
  }
  relationType: {
    alias: RelationKeys
    value: string
  }
  birthday: {
    alias: string
    value: string
  }
}

export type VerifyItemResult = { message: string, isValid: boolean, key: ComposeInputKeys, invalidType: 'empty' | 'len' | 'err' | 'checked'}
export type VerifyResult = Record<ComposeInputKeys, VerifyItemResult>

export type InputNames = 'userName' | 'mobile' | 'mobileOfID' | 'verifyCode' | 'picker' | 'IDNo' | 'radio' | 'gender' | 'birthday' | 'marital'
export type InputKeys =  'userName' | 'mobile' | 'mobileOfID' | 'verifyCode' | 'relationType'
                         | 'IDType' | 'IDNo' | 'gender' | 'birthday' | 'marital'
type ComposeInputKeys = InputKeys | 'agreementChecked' | 'ageLimit'

const triggerKeys = ['userName', 'mobile', 'IDNo', 'IDType', 'relation'] as const
export type VerifyTrigger = {
  [k in typeof triggerKeys[number]]: boolean
}

export type Slot = {
  key: 'button' | 'left-icon' | 'label' | 'input'
  node: 'countDown' | 'triangle' | 'verifyFlag' | 'gender' | 'marital'
}

export type Input = {
  name: InputNames
  key: InputKeys
  placeholder?: string
  label?: string
  slots?: Slot
  click?: string
  blurEv?: 'getMobileById'
  attrs?: string[]
  'right-icon'?: string
  maxlength?: number
}

export type FormType = 'login_phone' | 'login_others' | 'contact' | 'modifyContact' | 'order' | 'orderEncrypted' | 'readonly' | 'readonlyInfo'
