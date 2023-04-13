import { NavLink } from 'react-router-dom'
import s from './DialogItem.module.css'

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id

  let onDialogItemClick = () => {
    props.openDialog(props.id)
    props.markAsRead(props.id) 
  }

  return (
    <div className={s.dialog} onClick={onDialogItemClick}>
      <NavLink to={path}>
        <div className={s.dialogContent}>
          <div className={s.dialogNameWrapper}>
            <span className={s.dialogName}>
              {props.name}
              <span
                className={`${s.onlineStatus} ${
                  props.isOnline ? s.online : s.offline
                }`}></span>
            </span>
          </div>
          {props.unreadCount > 0 && (
            <div className={s.unreadCountWrapper}>
              <span className={s.unreadCount}>{props.unreadCount}</span>
            </div>
          )}
        </div>
      </NavLink>
    </div>
  )
}

export default DialogItem
