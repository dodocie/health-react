import { getValByKey } from 'src/utils/share'
import { CityPicked, Suppliers, SuppliersUI } from 'src/hooks/branch/defineBranch'
import { VendorIds } from './vendorConfig'
import { KeyMap } from 'src/utils/interface'
import { SurveyRiskStatus } from 'src/hooks/survey/defineSurveyResult'

export type ADType = 'adOpened' | 'closeAd'

export type InitConfig = {
  [k: string]: string | boolean | number | string[] | Record<string, unknown>
} & {
  surveyIds?: {[k: string]: string}
}

export type PartnerConfig = InitConfig & {
  redeem: boolean
  hideBriefEntry: boolean
  hideSurveyEntry: boolean
  menuCopy: {
    brief?: string
    survey: string[]
  }
  hideIDTypePicker: boolean,
  needInformOnCommend: boolean,
  isSingleHosp: boolean,
  isSingleCity: boolean,
  singleCity: CityPicked & {vendorids: VendorIds[]}
  suppliers: Suppliers
  suppliersUI: SuppliersUI
  branchSort: {key: 'hospitalCode'}
  hotline: string
  paymentSelector: 'offline' | ''
  userAction: {
    AD_TONGFANG: ADType[]
  }
  defCity?: string[]
  covidSurvey?: Record<string, KeyMap> & {initPage: string},
  healthRiskContent: Record<'levelTag'| 'riskColors'|'tagColors', RiskDescMap>
  fillColor: string
}

export type RiskDescMap = Record<SurveyRiskStatus | 'undefined', string>

const suppliers = {
  hstjzx: ['0002'],
  hscmb: ['0002'],
  picchealth: ['ruici'],
  picchealthapp: ['ruici'],
  powerhosp: ['healthchinabeijing'],
  powerhosphn: ['healthchinahenan'],
  powerhospsichuan: ['healthchinasichuan'],
  generalichinaapp: ['health100', 'ciming', 'aikang'],
  def: ['health100', 'ciming', 'haolaruici', 'aikang'],
  cpefund: ['mjlife', 'evergreen', 'deheng', 'pumc'],
  cpefamily: ['mjlife', 'evergreen', 'deheng', 'pumc', 'health100', 'ciming', 'haolaruici', 'aikang']
}

const props: { [k: string]: InitConfig } = {
  suppliers,
  suppliersUI: {
    ...suppliers,
    def: ['health100', 'ciming', 'haolaruici', 'aikang']
  },
  companyEntry: {
    silutianxia: 'silutianxia',
  },
  singleCity: {
    hstjzx: {
      vendorids: ['0002'],
      province: '湖北省',
      city: '黄石市'
    },
    hscmb: {
      vendorids: ['0002'],
      province: '湖北省',
      city: '黄石市'
    },
    powerhosp: {
      vendorids: ['healthchinabeijing'],
      province: '北京市',
      city: '北京市'
    }
  },
  defCity: {
    powerhosphn: ['河南省', '郑州市'],
    powerhospsichuan: ['四川省', '成都市'],
  },
  paymentSelector: {
    hstjzx: 'offline',
    powerhosp: 'offline',
    powerhosphn: 'offline',
    powerhospsichuan: 'offline',
    piccjsboc: 'offline',
  },
  branchSort: {
    picchealth: {
      key: 'hospitalCode'
    },
    picchealthapp: {
      key: 'hospitalCode'
    }
  },
  surveyIds: {
    haola: {
      cancer: '5a222fa1-958d-fb7b-04be-860ef8f22d9b'
    }
  },
  statusMap: {
    hstjzx: {
      isSick: 'isSick',
      isHighRisk: 'isHighRisk',
      isMediumRisk: 'isHighRisk',
      isLowRisk: 'isLowRisk'
    }
  },
  menuCopy: {
    futurebaobei: {
      survey: ['个性化体检评估', '原价29元评估免费享', '后续体检5折'],
      brief: '专享5折价'
    },
    def: {
      survey: ['评估风险 定制体检', '筛查潜在健康风险'],
    }
  },
  hotline: {
    hstjzx: '0714-6288795',
    picchealthapp: '95591',
    powerhosp: '010-63502195',
    powerhosphn: '0371-68691235',
    powerhospsichuan: '028-68125206',
    def: '4001092838'
  },
  fillColor: {
    powerhosp  : '#2BB5FF',
    powerhosphn: '#2BB5FF',
    powerhospsichuan: '#2BB5FF',
    icbcaxa: '#BB271B',
    aia: '#D31145',
    def: '#0CBACF'
  },
  userAction: {
    haola: {
      AD_TONGFANG: ['adOpened', 'closeAd']
    },
    powerhosp: {
      AD: ['adOpened', 'closeAd']
    }
  },
  partnerCName: {
    haola: '好啦',
    powerhosp: '北京电力医院'
  },
  accountName: {
    powerhosp: '我的团单',
    powerhosphn: '我的团单',
    powerhospsichuan: '我的团单',
    def: '我的钱包'
  },
  covidSurvey: {
    hstjzx: {
      initPage: 'head',
      buttonCopy: {
        positive: '是',
        negative: '否'
      },
      head: {
        copy: '为了保障安全良好的体检环境，请您在预约体检前认真完成检前问卷。',
        marker: ''
      },
      q_0: {
        result: 'followup',
        next: 'q_1',
        copy: '受检者本人、平时有密切接触的亲属或室友中，是否有新冠肺炎确诊病例或无症状感染者？',
        marker: '有病例确诊史'
      },
      q_1: {
        result: 'house',
        next: 'q_2',
        copy: '受检者本人及同居一所的亲属或室友中，14天内是否有新冠肺炎确诊病例或无症状感染者接触史？',
        marker: '有肺炎确诊病例接触史',
      },
      q_2: {
        result: 'visitDoc',
        next: 'q_3',
        copy: '受检者本人近14天内是否有发热、咽痛、咳嗽等呼吸道症状史？',
        marker: '有发热症状',
      },
      q_3: {
        result: 'house',
        next: 'q_4',
        marker: '接触史-高风险地区',
        copy: '受检者本人近14天内是否到过中、高风险地区及周边地区，是否有在病例报告社区或境外旅居史？'
      },
      q_4: {
        result: 'house',
        next: 'q_5',
        marker: '接触史-旅居发热人群',
        copy: '受检者本人近14天内是否与有境外旅居史同时伴有发热或呼吸道症状者有接触史？'
      },
      q_5: {
        result: 'house',
        marker: '接触史-聚集性发病',
        next: 'end',
        copy: '是否存在聚集性发病的情况，即14天内在小范围，如家庭、办公室、学校班级出现2例以上发热和（或）呼吸道症状的病例？'
      },
      house: {
        copy: '您的情况暂不宜体检，<span class="font-subtitle-large font-blue">建议居家隔离观察14天</span>，必要时发热预检分诊处咨询排查',
        marker: '建议隔离—'
      },
      followup: {
        copy: '您的情况暂不宜体检，<span class="font-blue font-subtitle-large">建议遵嘱</span>，必要时发热门诊复诊',
        marker: '建议遵医嘱—'
      },
      visitDoc: {
        copy: '您的情况暂不宜体检，<span class="font-blue font-subtitle-large">建议发热门诊就诊</span>',
        marker: '建议发热门诊就诊—'
      }
    },
    powerhosp: {
      initPage: 'q_0',
      buttonCopy: {
        positive: '不符合',
        negative: '以上都符合'
      },
      q_0: {
        result: 'house',
        next: 'end',
        copy: '请您确认本人21天内无境外旅居史、未到访国内中高风险地区、健康宝无异常，方可到院体检'
      },
      house: {
        copy: '您的情况暂不宜体检，感谢您的配合',
        marker: '不宜体检-'
      }
    },
    powerhospsichuan: {
      initPage: 'q_0',
      buttonCopy: {
        positive: '不符合',
        negative: '以上都符合'
      },
      q_0: {
        result: 'house',
        next: 'end',
        copy: '请您确认本人21天内无境外旅居史、未到访国内中高风险地区、健康码无异常，方可到院体检'
      },
      house: {
        copy: '您的情况暂不宜体检，感谢您的配合',
        marker: '不宜体检-'
      }
    }
  },
  timeOfUsingMarital: {
    hstjzx: new Date(2021, 8, 8).getTime(),
    powerhosp: new Date(2021, 8, 10).getTime(),
    powerhosphn: new Date(2021, 8, 10).getTime(),
    powerhospsichuan: new Date(2021, 8, 10).getTime(),
    def: new Date(2021, 8, 28).getTime(),
  },
  homeLogo: {
    icbcaxa: 'icbcaxalife.png',
    cpefund: 'cpefund.png'
  },
  healthRiskContent: {
    def: {
      levelTag: {
        isSick: '已患病',
        isHighRisk: '高风险',
        isMediumRisk: '中风险',
        isLowRisk: '一般风险',
        undefined: '一般风险',
      },
      riskColors: {
        isLowRisk : 'rgba(184, 184, 184, 0.5)',
        isSick    : 'rgba(51, 51, 51, 0.45)',
        isHighRisk: 'rgba(247, 0, 38, .7)',
        isMediumRisk: 'rgba(255, 157, 108, .8)',
        undefined : 'rgba(184, 184, 184, 0.5)'
      },
      tagColors  : {
        isHighRisk  : '#f70026',
        isMediumRisk: 'rgba(255, 157, 108, 1)',
        isLowRisk   : 'rgba(184, 184, 184)',
        isSick      : 'rgba(51, 51, 51, 0.8)',
        undefined   : 'rgba(184, 184, 184, 0.3)'
      }
    },
    cpefund: {
      levelTag: {
        isSick: '已患病',
        isHighRisk: '风险较高',
        isMediumRisk: '风险中等',
        isLowRisk: '风险较低',
        undefined: '风险较低',  
      },
      riskColors: {
        isLowRisk : 'rgba(184, 184, 184, 0.5)',
        isSick    : 'rgba(51, 51, 51, 0.45)',
        isHighRisk: 'rgba(247, 0, 38, .7)',
        isMediumRisk: 'rgba(255, 157, 108, .8)',
        undefined : 'rgba(184, 184, 184, 0.5)'
      },
      tagColors  : {
        isHighRisk  : '#f70026',
        isMediumRisk: 'rgba(255, 157, 108, 1)',
        isLowRisk   : 'rgba(184, 184, 184)',
        isSick      : 'rgba(51, 51, 51, 0.8)',
        undefined   : 'rgba(184, 184, 184, 0.3)'
      }   
    }
  },
  orderCXLBtnTips: {
    aia: '若想修改预约体检机构，请取消预约，重新预约',
    icbcaxa: '若想修改预约体检机构，请取消预约，重新预约',
    cpefund: '若想修改体检机构或更换套餐，请关闭订单，重新下单',
    def: '若想修改项目，请关闭订单，重新下单',
  },
  priceDescr: {
    def: {
      ori: '原价',
      selfCharge: ''
    },
    cpefund: {
      ori: '订单金额',
      selfCharge: '需自付'
    }
  },
  menuOrders: {
    def: ['orders', 'reports', 'account', 'branch']
  }
}

const p2: { [k: string]: string[] } = {
  hideAccountMenu: ['xinchenglife', 'xcemarketing', 'piccjsboc', 'shanghailifekf', 'cpefund'],
  hideOrigCost: ['xinchenglife', 'xcemarketing', 'piccjsboc', 'shanghailifekf'],
  hideBriefEntry: ['picchealth', 'picchealthapp', 'cathaylifehb', 'hezhong', 'icbcaxa', 'cpefund'],
  hideSurveyEntry: ['cathaylifehb', 'hezhong', 'powerhosp', 'icbcaxa', 'cpefund',  'aia'],
  needInformOnCommend: ['hstjzx'],
  useAdminToken: ['powerhosp', 'powerhosphn', 'powerhospsichuan'],
  isSingleHosp: ['hstjzx'],
  isSingleCity: ['powerhosp', 'hstjzx'],
  hideIDTypePicker: ['hstjzx'],
  config4picc: ['picchealth', 'picchealthapp'],
  hideBranchOfBriefPack: ['powerhosp'],
  hideReportEntry: ['powerhosp', 'powerhosphn', 'powerhospsichuan'],
  hideContacts: ['powerhosp', 'powerhosphn'],
  useBlueImg: ['powerhosp', 'powerhosphn', 'powerhospsichuan'],
  redeem: ['haola'],
  hideMarital: ['cpefund'],
  hideRelationType: ['cpefund'],
  // hideMobileLogin: ['powerhosp', 'powerhosphn', 'powerhospsichuan'],
  defIDLogin: ['hstjzx']
  // showAD: ['haola']
}

export function getPartnerConfig(partnerName: string): InitConfig {
  const r1 = reducer1(partnerName)
  const r2 = reducer2(partnerName)
  return { ...Object.keys(props).reduce(r1, {}), ...Object.keys(p2).reduce(r2, {}) }
}

function reducer1(partnerName: string) {
  return function (obj: InitConfig, key: string) {
    const item = getValByKey(props, key)
    const config = item[partnerName] || item['def']
    config && (obj[key] = config)
    return obj
  }
}

function reducer2(partnerName: string) {
  return function (obj: InitConfig, key: string) {
    obj[key] = p2[key].some(v => v === partnerName)
    return obj
  }
}
