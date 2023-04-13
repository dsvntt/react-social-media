import { NavLink } from 'react-router-dom'
import s from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={s.navbar}>
      <ul className={s.menuItems}>
        <li>
          <NavLink
            to='/profile'
            className={({ isActive }) => (isActive ? s.activeMenuItem : undefined)}>
            <p className={s.menuItem} data-item='Profile'>
              Profile
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/dialogs'
            className={({ isActive }) => (isActive ? s.activeMenuItem : undefined)}>
            <p className={s.menuItem} data-item='Dialogs'>
              Dialogs
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/users'
            className={({ isActive }) => (isActive ? s.activeMenuItem : undefined)}>
            <p className={s.menuItem} data-item='Users'>
              Users
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/news'
            className={({ isActive }) => (isActive ? s.activeMenuItem : undefined)}>
            <p className={s.menuItem} data-item='News'>
              News
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/music'
            className={({ isActive }) => (isActive ? s.activeMenuItem : undefined)}>
            <p className={s.menuItem} data-item='Music'>
              Music
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/settings'
            className={({ isActive }) => (isActive ? s.activeMenuItem : undefined)}>
            <p className={s.menuItem} data-item='Settings'>
              Settings
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
