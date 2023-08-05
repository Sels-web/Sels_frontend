import { Route } from 'react-router-dom'
import Home from '../views/Home'
const Routers = () => (
    <>
      <Route path="/" exact={true} component={Home} />
    </>
)

export default Routers;
