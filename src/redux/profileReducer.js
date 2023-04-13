import { stopSubmit } from 'redux-form'
import { profileAPI, usersAPI } from '../api/api'

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    { id: 1, message: 'Hi! This is my first post!', likesCount: 539 },
    {
      id: 2,
      message: 'Wow, what a beautiful social network',
      likesCount: 567,
    },
    { id: 3, message: 'You can add your message too!', likesCount: 100 },
  ],
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let body = action.newPostText
      let newPost = {
        id: 5,
        message: body,
        likesCount: 7,
      }

      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, { id: 5, message: body, likesCount: 7 }],
      }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      }
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      }
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      }
    }

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      }
    }

    default:
      return state
  }
}

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
})

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const response = await profileAPI.saveProfile(profile)
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }))
    return Promise.reject(response.data.messages[0])
  }
}

export const addPostAC = (newPostText) => ({ type: ADD_POST, newPostText })
export default profileReducer
