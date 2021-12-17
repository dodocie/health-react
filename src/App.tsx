import { useRoutes } from 'react-router-dom'
import Index from 'src/pages/Index'
import Home from 'src/pages/home'

function App() {
  return useRoutes([
    {
      path: '/',
      element: <Index />,
    },
    {
      path: 'home',
      element: <Home />
    },
  ])
}

export default App;
