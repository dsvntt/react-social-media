import s from './ProfileDataForm.module.css'
import {
  createField,
  Input,
  Textarea,
} from '../../common/FormsControls/FormsControls'
import { reduxForm } from 'redux-form'
import Button from '../../common/Button/Button'

const ProfileDataForm = ({ handleSubmit, profile, error, handleClose }) => {
  const handleCloseClick = (e) => {
    e.preventDefault()
    handleClose()
  }

  const keys1 = ['facebook', 'website', 'twitter']
  const keys2 = ['instagram', 'youtube', 'github']

  return (
    <div className={s.popupBox}>
      <div className={s.box}>
        <form>
          <h2 className={s.editProfileH2}>Edit your profile</h2>
          <div className={s.closeIcon}>
            <button
              onClick={handleCloseClick}
              className={s.closeModalButton}
              type='button'>
              <i className='fas fa-times'></i>
            </button>
          </div>
          <div className={s.fullNameBlock}>
            <b className={s.fullNameText}>Full name / Nickname:</b>{' '}
            <div className={s.fullNameInput}>
              {createField('', 'fullName', [], Input, {styleVariant: 'style1'})}
            </div>
          </div>

          <div className={s.aboutMeBlock}>
            <b className={s.aboutMeText}>About me:</b>
            <p className={s.aboutMeLittleText}>
              Tell something about yourself. What are your hobbies? What do you
              work/study for?
            </p>
            <div className={s.aboutMeTextarea}>
              {createField('', 'aboutMe', [], Textarea, 'small', {styleVariant: 'style1'})}
            </div>
          </div>

          <div className={s.contactsBlock}>
            <b className={s.contactsText}>Contacts:</b>
            <div className={s.contactsRow}>
              {keys1.map((key) => {
                if (key === 'vk' || key === 'mainLink') {
                  return null
                }
                return (
                  <div key={key} className={s.contact}>
                    {createField(key, 'contacts.' + key, [], Input, {styleVariant: 'style1'})}
                  </div>
                )
              })}
            </div>
            <div className={s.contactsRow}>
              {keys2.map((key) => {
                if (key === 'vk' || key === 'mainLink') {
                  return null
                }
                return (
                  <div key={key} className={s.contact}>
                    {createField(key, 'contacts.' + key, [], Input, {styleVariant: 'style1'})}
                  </div>
                )
              })}
            </div>
          </div>

          {error && <div className={s.popupError}>{error}</div>}

          <div className={s.savePopupButton}>
            <Button buttonText='Save' onClick={handleSubmit} size='large' />{' '}
          </div>
        </form>
      </div>
    </div>
  )
}

const ProfileDataFormReduxForm = reduxForm({
  form: 'edit-profile',
  initialValues: {
    lookingForAJobDescription: '',
  },
})(ProfileDataForm)

export default ProfileDataFormReduxForm
