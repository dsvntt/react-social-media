import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/profile.png'
import { NavLink } from 'react-router-dom'

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div className={s.userCard}>
      <div className={s.userName}>{user.name}</div>
      <NavLink to={'/profile/' + user.id}>
        <img
          src={user.photos.small != null ? user.photos.small : userPhoto}
          className={s.userPhoto}
        />
      </NavLink>
      <div className={s.userInfo}>
        <div className={s.userStatus}>{user.status}</div>
      </div>
      <div>
        {user.followed ? (
          <button
            className={s.followButton}
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => {
              unfollow(user.id)
            }}>
            unfollow
          </button>
        ) : (
          <button
            className={s.followButton}
            disabled={followingInProgress.some((id) => id === user.id)}
            onClick={() => {
              follow(user.id)
            }}>
            follow
          </button>
        )}
      </div>
    </div>
  )
}

export default User
