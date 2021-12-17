import {RestFunc, KeyMap} from 'src/utils/interface'

export type ItemSummary = {
  id: string,
  type?: 'item' | 'package' | 'compoundPackage',
  parentId?: string
  items?: ItemSummary[]
}

export const vid_UI_map: Record<VendorIds, VendorIdsUI[]> = {
  '0001'              : ['health100', 'ciming'],
  'health100'         : ['health100', 'ciming'],
  '0002'              : ['0002'],
  'ruici'             : ['ruici'],
  'haolaruici'        : ['haolaruici'],
  'hebaoruici'        : ['hebaoruici'],
  'healthchinabeijing': ['healthchinabeijing'],
  'healthchinahenan'  : ['healthchinahenan'],
  'healthchinasichuan': ['healthchinasichuan'],
  'aikang'            : ['aikang'],
  'mjlife'            : ['mjlife'],
  'evergreen'         : ['evergreen'],
  'deheng'            : ['deheng'],
  'deheng_2'           : ['deheng_2'],
  'pumc'           : ['pumc'],
}
export const vidMap = {
  ciming: 'health100'
} as const

export const supplierName = {
  '0001'              : '美年大健康',
  'health100'         : '美年大健康',
  'ciming'            : '慈铭',
  '0002'              : '鄂东医疗集团市中心医院健康管理部',
  'ruici'             : '瑞慈医疗投资集团有限公司',
  'haolaruici'        : '瑞慈体检',
  'hebaoruici'        : '瑞慈体检',
  'healthchinabeijing': '北京电力医院',
  'healthchinahenan'  : '河南电力医院',
  'healthchinasichuan': '四川电力医院',
  'aikang'            : '爱康国宾健康体检管理集团有限公司',
  'mjlife'            : '美兆',
  'evergreen'         : '爱康君安',
  'deheng'            : '德恒诊所',
  'deheng_2'           : '德恒诊所',
  'pumc'           : '协和医院',
}

type VidKeyMap<T> = {
  [k in VendorIdsUI]: T
}

export type VendorConfig = {
  supplierName: VidKeyMap<string>
  supplierAlia: VidKeyMap<string>
  vid_UI_map: Record<VendorIds, VendorIdsUI[]>
  vidMap: KeyMap
  openTime: {
    '0002': string
    def: string
  }
  interval: Partial<VidKeyMap<KeyMap>>
  updateRsvnCondition: Partial<VidKeyMap<[RestFunc<string>, string]>>
  briefBasicItems: Partial<VidKeyMap<ItemSummary[]>>
  reminder: Record<string, {tag: string, texts: string[]} []>
  vendorMinAge: Record<Exclude<VendorIds, 'ciming' | '0001' | '0002'>, number>
}

export type VendorIds = Exclude<VendorIdsUI, 'ciming'>
export type VendorIdsUI = keyof typeof supplierName

export const vendorConfig: VendorConfig = {
  supplierName: supplierName,
  supplierAlia: {
    '0001'              : '美年大健康',
    'health100'         : '美年大健康',
    'ciming'            : '慈铭',
    '0002'              : '鄂东医疗集团市中心医院健康管理部',
    'ruici'             : '瑞慈',
    'haolaruici'        : '瑞慈体检',
    'hebaoruici'        : '瑞慈体检',
    'healthchinabeijing': '北京电力医院',
    'healthchinahenan'  : '河南电力医院',
    'healthchinasichuan': '四川电力医院',
    'aikang'            : '爱康国宾',
    'mjlife'            : '美兆',
    'evergreen'         : '爱康君安',
    'deheng'            : '德恒诊所',
    'deheng_2'          : '德恒诊所',
    'pumc'              : '协和医院',
  },
  vid_UI_map,
  vidMap,
  openTime    : {
    '0002'              : '07:30',
    'def'               : '08:00'
  },
  interval    : {
    'healthchinabeijing': {
      '01': '7:30～8:00',
      '02': '8:00～8:30',
      '03': '8:30～9:00',
      '04': '9:00～9:30',
      '11': '13:00～13:30',
      '12': '13:30～14:00',
      '13': '14:00～14:30',
      '14': '14:30～15:00',
      '15': '15:00～15:30',
    },
    '0002'              : {
      '01': '7:30～8:00',
      '02': '8:00～8:30',
      '03': '8:30～9:00',
      '04': '9:00～9:30',
    },
    'healthchinahenan' : {
      '01': '7:30～8:30',
      '02': '8:30～9:30'
    }
  },
  updateRsvnCondition: {
    health100 : [c1, '你好，若确定未到检，可在明日修改预约'],
    ruici     : [c1, '你好，若确定未到检，可在明日修改预约'],
    haolaruici: [c1, '你好，若确定未到检，可在明日修改预约'],
    aikang    : [c1, '你好，若确定未到检，可在明日修改预约'],
    // healthchinahenan: [c2, '已到体检日，不支持线上修改，请联系<a href="tel: 0371-68691235">0371-68691235</a>处理']
  },
  briefBasicItems: {
    health100 : [{id: '2120003287', type: 'item'}, {id: '2120005001', type: 'item'}, {id: '2120005002', type: 'item'}],
    ruici     : [{id: '048003', parentId: '2100196201', type: 'item'}, {id: '049011',  parentId: '2100196201', type: 'item'}],
    haolaruici: [{id: '100001', parentId: '2002859201', type: 'item'}, {id: '100013',  parentId: 'W6', type: 'item'}, {id: '100031',  parentId: 'W13', type: 'item'}],
    aikang    : [
      {id: 'NONEM2438877', parentId: 'NONEM2438877', type: 'item'}
    ],
    healthchinahenan: [{id: '0107'}],
    healthchinabeijing: [{id: '101'}]
  },
  reminder: {
    '0002': [
      {
        tag: '请携带本人身份证',
        texts: []
      },
      {
        tag: '不晚于09:00开始检查',
        texts: []
      },
      {
        tag: '体检流程',
        texts: ['1. 空腹检查项目后，可到配餐区领取免费营养早餐一份',
                '2. 体检过程中，如果您有任何困难，请与导检护士联系；若需增加项目，请与二楼体检中心接待处联系。贵重物品请随身携带，以免遗失。',
                '3. 全部检查项目完毕后，请您在一楼导检接待处确认所有项目是否全部检完，并将体检单交给护士登记后离开。',
                '4. 领取体检报告时间：体检完成后3—5个工作日（不含特殊检查）。',
                '5. 领取体检报告方式：凭身份证在7号楼一楼自助报告机上打印。',
                '6. 周一至周五下午13:30—16:00，在2楼A219室设有专家咨询，您可咨询体检报告中的问题。']
      }
    ]
  },
  vendorMinAge: {
    healthchinabeijing: 14,
    healthchinahenan: 14,
    healthchinasichuan: 14,
    health100: 18,
    ruici:18,
    haolaruici: 18,
    hebaoruici: 18,
    aikang: 18,
    mjlife: 18,
    evergreen: 18,
    deheng: 18,
    deheng_2: 18,
    pumc: 18,
  }
}

function c1 (dayStr: string, appointmentDate: string): boolean {
  return dayStr===appointmentDate
}

// function c2 (dayStr: string, appointmentDate: string) {
//   return dayStr>=appointmentDate
// }
