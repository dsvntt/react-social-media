const SEND_MESSAGE = 'SEND_MESSAGE'
const OPEN_DIALOG = 'OPEN_DIALOG'
const MARK_AS_READ = 'MARK_AS_READ'

let initialState = {
  dialogs: [
    { id: 1, name: 'John Doe', isOnline: true, unreadCount: 2 },
    { id: 2, name: 'Jane Smith', isOnline: false, unreadCount: 0 },
    { id: 3, name: 'David Brown', isOnline: true, unreadCount: 2 },
    { id: 4, name: 'Mary Johnson', isOnline: false, unreadCount: 0 },
    { id: 5, name: 'James White', isOnline: true, unreadCount: 0 },
  ],
  messages: {
    1: [
      {
        id: 1,
        message: 'Hi John, how are you?',
        isRead: true,
        userId: 1,
        timestamp: new Date(),
      },
      {
        id: 2,
        message: 'Hey, I am fine. Thanks for asking!',
        isRead: true,
        userId: 2,
        timestamp: new Date(),
      },
      {
        id: 2,
        message: 'What about you?',
        isRead: false,
        userId: 2,
        timestamp: new Date(),
      },
    ],
    2: [
      {
        id: 1,
        message: 'Hey Jane, are you free tomorrow?',
        isRead: true,
        userId: 1,
        timestamp: new Date(),
      },
    ],
    3: [
      {
        id: 1,
        message: 'Hello David, long time no see!',
        isRead: true,
        userId: 1,
        timestamp: new Date(),
      },
      {
        id: 2,
        message: 'Hi there, yeah it has been a while.',
        isRead: false,
        userId: 3,
        timestamp: new Date(),
      },
      {
        id: 3,
        message: "Let's catch up sometime.",
        isRead: false,
        userId: 3,
        timestamp: new Date(),
      },
    ],
    4: [
      {
        id: 1,
        message: 'Hey Mary, I hope you are doing well!',
        isRead: true,
        userId: 1,
        timestamp: new Date(),
      },
    ],
    5: [
      {
        id: 1,
        message: 'James, did you complete the project?',
        isRead: true,
        userId: 1,
        timestamp: new Date(),
      },
      {
        id: 2,
        message: 'Yes, I did. I will send it to you shortly.',
        isRead: true,
        userId: 4,
        timestamp: new Date(),
      },
    ],
  },
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: Date.now(),
        userId: action.payload.senderId, 
        message: action.payload.newMessageBody,
        isRead: false,
        timestamp: Date.now(),
      }
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.userId]: [
            ...state.messages[action.payload.userId],
            newMessage,
          ],
        },
      }
    case OPEN_DIALOG: {
      return {
        ...state,
        activeDialogId: action.userId,
      }
    }

    case MARK_AS_READ: {
      return {
        ...state,
        dialogs: state.dialogs.map((dialog) =>
          dialog.id === action.payload.dialogId
            ? { ...dialog, unreadCount: 0 }
            : dialog
        ),
      }
    }

    default:
      return state
  }
}

export const markAsReadActionCreator = (dialogId) => ({
  type: MARK_AS_READ,
  payload: { dialogId },
})

export const sendMessageActionCreator = (userId, newMessageBody, senderId) => ({
  type: SEND_MESSAGE,
  payload: { userId, newMessageBody, senderId },
})

export const openDialogActionCreator = (userId) => {
  return {
    type: OPEN_DIALOG,
    userId,
  }
}

export default dialogsReducer
