import { Route } from 'react-router-dom'
import Schedule from '../views/schedule/page/Schedule'
import Members from '../views/members/page/Members'
import Boards from '../views/boards/page/Boards'
import Admin from '../views/admin/page/Admin'
const Routers = () => (
    <>
      <Route path="/schedule" exact={true} component={Schedule} />
      <Route path="/members" exact={true} component={Members} />
      <Route path="/boards" exact={true} component={Boards} />
      <Route path="/admin" exact={true} component={Admin} />
    </>
)

export default Routers;
