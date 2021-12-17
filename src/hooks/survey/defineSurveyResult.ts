// import {IndType}     from 'src/components/service/home/Individual'
// import {BonusFnArgs} from 'src/hooks/bonus/defineBonus'
// import {Gender}      from 'src/hooks/userProfile/defineUser'

type One_Zero = 0 | 1

export type ModelResult = {
                            [k: string]: Record<string, unknown>
                          } & {
                            age: number
                            gender: One_Zero
  marriage: One_Zero
                          }

export interface SurveyResult {
  model_result: ModelResult
  update_time: string
}

export type LocalSurveyData = {
  modelResult: ModelResult
  surveyTime: number
  syncTime: number
  surveyContent: SurveyContent
}

export type SurveyContent = {
  gender: 'male' | 'female'
  marital: 'married' | 'unmarried'
  age: number
  profile: string
}

export type Organ = {
  [k: string]: string
} & {
  status: SurveyRiskStatus
  tags: Array<{orValue: number, name: string}>
  compareItems: string[]
  recommendReasons: string[]
  isMark: 0 | 1
  dChineseName: string
}

export type RiskResult = {
  [k:string]: Organ
}

export type Pepath = 'phexam3' | 'phexamlite' | 'hracancer' | 'hraplus' | 'hraplus2' | 'pehraplus' | 'hraplus2ruizai' | 'elder3' | 'elder2' | 'hraflex'
type HighRisk = 'isSick' | 'isHighRisk' | 'isMediumRisk'
type LowRisk = 'isLowRisk' | 'isMark' | 'isUnmark'
export type RiskStatus = HighRisk | LowRisk
export type SurveyRiskStatus = Exclude<RiskStatus,  'isMark' | 'isUnmark'>

// export type Arg<T extends BonusFnArgs | IndType> = T extends BonusFnArgs ? BonusFnArgs : IndType

// export type CovidCB = (args: IndType)=>void
// export type CovidCB2 = (args: BonusFnArgs)=>void
