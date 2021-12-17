const menuMap = {
  orders: {
    title: '我的订单',
    svgPath: 'M128.268586,65.1117823 L150.744982,120.742814 C151.779429,123.303161 150.542443,126.217318 147.982096,127.251766 L92.3510642,149.728161 C89.7907167,150.762609 86.8765595,149.525623 85.842112,146.965275 L63.3657164,91.3342439 C62.3312689,88.7738964 63.5682552,85.8597392 66.1286027,84.8252916 L121.759634,62.348896 C124.319981,61.3144485 127.234139,62.5514348 128.268586,65.1117823 Z',
    imgName: 'btn-orders-2.png',
    content: 0,
  },
  reports: {
    title: '体检报告',
    svgPath: 'M86.2007419,31.9009989 L99.9998929,66.0566274 L100,90 L43.6710729,89.9988015 C34.8473478,68.1033415 30.3274724,56.858444 30.1114466,56.2641091 C29.1389456,53.5885424 31.0115815,51.1410604 32.4737942,49.7343422 C32.9181119,49.1332959 33.5295385,48.6437594 34.2738855,48.3430237 L80.7236371,29.5761059 C82.8780993,28.7056466 85.3302827,29.7465367 86.2007419,31.9009989 Z',
    imgName: 'btn-orders-2.png',
    content: 0
  }
}

type MenuNames = 'orders' | 'reports'
export function getMenuList(menus: MenuNames[]){
  return menus.map(menu=>({
    ...menuMap[menu],
    key: menu
  }))
}