import Profile from './Profile'
import React from 'react'
import { connect } from 'react-redux'
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profileReducer'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { compose } from 'redux'

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation()

    let navigate = useNavigate()

    let params = useParams()

    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
}

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.router.params.userId

    if (!userId) {
      userId = this.props.authorizedUserId

      if (!userId) {
        this.props.router.navigate('/login')
        return null
      }
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    if (!this.props.isAuth) {
      return <Navigate to='/login' />
    }
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.router.params.userId}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer)
