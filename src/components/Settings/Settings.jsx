import Button from '../common/Button/Button'
import s from './Settings.module.css'

const Settings = (props) => {
  return (
    <div>
      <div className={s.logoutText}>
        <p className={s.textGray}>You can log out here.</p>
        <p className={s.textBlue}>Thank you for visiting!</p>
      </div>
      {props.isAuth && (
        <div className={s.logoutButton}>
          <Button buttonText='Log out' onClick={props.logout} size='large' />
        </div>
      )}
    </div>
  )
}

export default Settings
