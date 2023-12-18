import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        displayNotifcation(state, action)  {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
  }
})

export const setNotification = (notifcation, timeout) => {
    return async dispatch => {
        dispatch(displayNotifcation(notifcation))
        setTimeout(() => {
            dispatch(removeNotification())
          }, timeout * 1000)
    }
}

export const { displayNotifcation, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer