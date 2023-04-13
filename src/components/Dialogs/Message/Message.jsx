import React from 'react'
import s from './Message.module.css'

const Message = (props) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`
  }

  const isFromCurrentUser = props.id === 1
  const messageWrapperClass = isFromCurrentUser
    ? `${s.messageWrapper} ${s.fromCurrentUser}`
    : `${s.messageWrapper} ${s.fromOtherUser}`

  return (
    <div className={messageWrapperClass}>
      <div className={s.message}>
        <div
          className={`${s.messageContent} ${
            isFromCurrentUser ? s.fromCurrentUser : ''
          }`}>
          {props.message}
        </div>
        <span className={s.messageTimestamp}>
          {formatDate(props.timestamp)}
        </span>
      </div>
    </div>
  )
}

export default Message
