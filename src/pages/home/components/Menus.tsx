import Menu from './Menu'
import { getMenuList } from './menuList'

function Menus(){
  const menuList = getMenuList(['orders', 'reports'])

  return (
    <ul className="page-menu-list margin-auto flex-between">
      {
        menuList.map(menu=>(
          <Menu { ...menu} />
        ))
      }
    </ul>
  )
}

export default Menus