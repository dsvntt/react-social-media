import React, { useState, useRef } from 'react'
import Preloader from '../../common/preloader/preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/profile.png'
import ProfileDataForm from './ProfileDataForm'
import MyPostsContainer from '../MyPosts/MyPostsContainer'
import facebookLogo from '../../../assets/logos/facebookLogo.svg'
import instagramLogo from '../../../assets/logos/instagramLogo.svg'
import youtubeLogo from '../../../assets/logos/youtubeLogo.svg'
import twitterLogo from '../../../assets/logos/twitterLogo.svg'
import githubLogo from '../../../assets/logos/githubLogo.svg'
import ownSiteLogo from '../../../assets/logos/ownSiteLogo.svg'
import Button from '../../common/Button/Button'

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const inputRef = useRef(null)
  const [editMode, setEditMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setEditMode(!editMode)
    setIsOpen(!isOpen)
  }

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    formData.fullName = formData.fullName || 'no username'
    formData.lookingForAJob = formData.lookingForAJob || false
    formData.lookingForAJobDescription =
      formData.lookingForAJobDescription || 'undefined'
    formData.aboutMe =
      formData.aboutMe ||
      "This is About Me. You can edit this by clicking on 'edit' button."

    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }

  const onPhotoClick = () => {
    inputRef.current.click()
  }

  return (
    <div className={s.profilePage}>
      <div className={s.profilePageLeft}>
        <div className={s.fullName}>{profile.fullName}</div>
        <img
          src={profile.photos.large || userPhoto}
          className={s.mainPhoto}
          onClick={isOwner ? onPhotoClick : null}
        />

        {isOwner && (
          <input
            type={'file'}
            onChange={onMainPhotoSelected}
            ref={inputRef}
            className={s.photoInput}
          />
        )}

        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
            handleClose={togglePopup}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true)
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}

        <div className={s.profileStatus}>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
      </div>

      <div className={s.profilePageRight}>
        <ProfileInfoRight profile={profile} isOwner={isOwner} />
      </div>
    </div>
  )
}

const socialNetworkIcons = {
  github: (
    <i>
      <img src={githubLogo} />
    </i>
  ),
  facebook: (
    <i>
      <img src={facebookLogo} />
    </i>
  ),
  instagram: (
    <i>
      <img src={instagramLogo} />
    </i>
  ),
  twitter: (
    <i>
      <img src={twitterLogo} />
    </i>
  ),
  website: (
    <i>
      <img src={ownSiteLogo} />
    </i>
  ),
  youtube: (
    <i>
      <img src={youtubeLogo} />
    </i>
  ),
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      <div className={s.profileData}>
        <div className={s.profilePageLeft}>
          <div className={s.iconsContainer}>
            {Object.keys(profile.contacts).map((key) => {
              if (key === 'vk' || key === 'mainLink') {
                return null
              }
              return (
                <span key={key} className={s.socialMediaIcon}>
                  <Contact
                    key={key}
                    contactTitle={key}
                    contactValue={profile.contacts[key]}
                    socialNetworkIcon={socialNetworkIcons[key]}
                  />
                </span>
              )
            })}
            {isOwner && (
              <span className={s.editButton}>
                <Button
                  buttonText={'edit'}
                  onClick={goToEditMode}
                  size="small"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileInfoRight = ({ profile, isOwner }) => {
  return (
    <div>
      <div className={s.aboutMe}>
        <b>About me:</b>
        {profile.aboutMe}
      </div>

      {isOwner && (
        <div className={s.myPosts}>
          <MyPostsContainer />
        </div>
      )}
    </div>
  )
}

const Contact = ({ contactValue, socialNetworkIcon }) => {
  return (
    <div className={s.contact}>
      <a href={contactValue}>{socialNetworkIcon}</a>
    </div>
  )
}

export default ProfileInfo
