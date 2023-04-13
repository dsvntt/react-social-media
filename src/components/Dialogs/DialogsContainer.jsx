import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import {
  sendMessageActionCreator,
  openDialogActionCreator,
  markAsReadActionCreator,
} from '../../redux/dialogsReducer'

import Dialogs from './Dialogs'

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    currentUserId: state.auth.userId,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (userId, newMessageBody, senderId) => {
      dispatch(sendMessageActionCreator(userId, newMessageBody, senderId))
    },
    openDialog: (userId) => {
      dispatch(openDialogActionCreator(userId))
    },
    markAsRead: (dialogId) => {
      dispatch(markAsReadActionCreator(dialogId))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
