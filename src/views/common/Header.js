import './Header.sass'
import {NavLink} from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <div className={'inner'}>
        <div className={'logo-wrap'}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo.jpeg`} alt="SELS"/>
        </div>
        <div className="menu-wrap">
          <ul>
            <li>
              <NavLink to="/schedule">일정</NavLink>
            </li>
            <li>
              <NavLink to="/members">멤버</NavLink>
            </li>
            <li>
              <NavLink to="/boards">자료실</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header