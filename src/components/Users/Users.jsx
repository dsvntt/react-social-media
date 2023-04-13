import s from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

let Users = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  ...props
}) => {
  const filteredUsers = users.filter((user) => user.status)

  return (
    <div className={s.container}>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />

      <div className={s.userList}>
        {filteredUsers.map((u) => (
          <User
            user={u}
            followingInProgress={props.followingInProgress}
            key={u.id}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  )
}

export default Users
