import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormsControls/FormsControls'
import { required } from '../../../utils/validators/validators'
import Button from '../../common/Button/Button'

const AddMessageForm = (props) => {
  const { handleSubmit, onMessageChange, onKeyUp } = props

  const onFormSubmit = (formData) => {
    handleSubmit(formData)
    props.reset()
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={required}
          placeholder='Enter your message'
          name='newMessageBody'
          onChange={onMessageChange}
          onKeyUp={onKeyUp}
        />
      </div>
      <div>
        <Button buttonText='Send Message' onClick={() => {}} />
      </div>
    </form>
  )
}

export default reduxForm({ form: 'dialog-add-message-form' })(AddMessageForm)
