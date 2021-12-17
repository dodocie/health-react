import { Badge } from 'react-vant'
import { useAtom } from 'jotai'
import { userConfig } from 'src/store/user'

type MenuProps = {
  num?: number
  title: string
  svgPath: string
  imgName: string
}

function Menu(props: MenuProps){
  const [configData] = useAtom(userConfig)

  return (
    <Badge content={props.num}>
      <li className="bg-f7f8fa">
        <h5>{props.title}</h5>
        <div className="invisible-box">
          <svg className="svg-menu z-index-1 svg-size-80" viewBox="0 0 150 135" xmlns="http://www.w3.org/2000/svg">
            <g id="btn-orders-1-discolor" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <path id="形状结合" fill={configData?.partnerConfig.fillColor} d={props.svgPath} />
            </g>
          </svg>
        </div>
      </li>
    </Badge>
  )
}

export default Menu