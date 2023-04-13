import { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'
import s from './App.module.css'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer, {
  withRouter,
} from './components/Profile/ProfileContainer'
import UsersContainer from './components/Users/UsersContainer'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/preloader/preloader'
import { compose } from 'redux'
import store from './redux/redux-store'
import { withAuthRedirect } from './hoc/withAuthRedirect'
import SettingsContainer from './components/Settings/SettingsContainer'
import News from './components/News/News'
import Music from './components/Music/Music'

const ProfileWithAuthRedirect = withAuthRedirect(ProfileContainer)

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className={s.appWrapper}>
        {this.props.isAuth && <Navbar />}
        <div className={s.appWrapperContent}>
          <Routes>
            <Route
              path="/"
              element={
                this.props.initialized ? (
                  this.props.isAuth ? (
                    <Navigate to="/profile" />
                  ) : (
                    <Navigate to="/login" />
                  )
                ) : (
                  <Preloader />
                )
              }
            />
            <Route path="/dialogs/:userId?" element={<DialogsContainer />} />
            <Route
              path="/profile/:userId?"
              element={
                <div className={s.profileBackgroundImg}>
                  <ProfileWithAuthRedirect />
                </div>
              }
            />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<SettingsContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

const SocialMediaApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default SocialMediaApp
