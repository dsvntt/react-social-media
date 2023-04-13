import { Navigate, useParams } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import AddMessageForm from './AddMessageForm/AddMessageForm'

const Dialogs = (props) => {
  const { userId } = useParams()
  let state = props.dialogsPage
  const { currentUserId } = props

  let messagesElement = state.messages[userId]?.map((m) => (
    <Message
      message={m.message}
      id={m.userId}
      key={m.id}
      isRead={m.isRead}
      timestamp={m.timestamp}
      currentUserId={currentUserId}
    />
  ))

  let addNewMessage = (values) => {
    props.sendMessage(userId, values.newMessageBody, 1)
  }

  let dialogsElement = state.dialogs.map((d) => (
    <DialogItem
      name={d.name}
      id={d.id}
      key={d.id}
      isOnline={d.isOnline}
      openDialog={props.openDialog}
      unreadCount={d.unreadCount}
      markAsRead={props.markAsRead}
    />
  ))

  if (!props.isAuth) return <Navigate to={'/login'} />

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsContainer}>
        <div className={s.dialogsItems}>{dialogsElement}</div>
        <div className={s.messagesTextareaContainer}>
          <div className={s.messagesContainer}>
            <div className={s.messages}>{messagesElement}</div>{' '}
          </div>
          <div className={s.addMessageForm}>
            <AddMessageForm onSubmit={addNewMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
