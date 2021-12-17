import { useAtom, Provider } from 'jotai'
import { NavLink } from 'react-router-dom'
import { countNum } from 'src/store'
import { userConfig } from 'src/store/user'

function Index () {
  const [count, setCount] = useAtom(countNum)
  const [configData] = useAtom(userConfig)

  return (
    <Provider>
      <h1>{count}</h1>
      <button onClick={()=>setCount(c=>c+1)}>加加</button>
      <p>{configData?.urlsrc}</p>
      {<NavLink to="home">home</NavLink>}
    </Provider>
  )
}

export default Index