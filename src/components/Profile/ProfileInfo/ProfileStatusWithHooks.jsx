import { useState, useEffect, useRef } from 'react'
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const textareaRef = useRef(null)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      deactivateEditMode()
    }
  }

  useEffect(() => {
    if (editMode && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.selectionStart = textareaRef.current.value.length
      textareaRef.current.selectionEnd = textareaRef.current.value.length
    }
  }, [editMode])

  return (
    <div className={s.statusWrapper}>
      <div className={s.status}>
        {!editMode && (
          <div>
            <span onDoubleClick={activateEditMode}>
              <div className={s.statusText}>
                {props.status || "The user doesn't have a status yet."}
              </div>
            </span>
          </div>
        )}
        {editMode && (
          <div>
            <textarea
              ref={textareaRef}
              onChange={onStatusChange}
              onBlur={deactivateEditMode}
              value={status}
              className={s.editMode}
              onKeyDown={handleKeyPress}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileStatusWithHooks
