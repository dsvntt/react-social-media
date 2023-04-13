import React from 'react'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { logout } from '../../redux/authReducer'
import Settings from './Settings'
import { compose } from 'redux'

class SettingsContainer extends React.Component {
  render() {
    return <Settings {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default compose(
  connect(mapStateToProps, { logout }),
  withAuthRedirect
)(SettingsContainer)
