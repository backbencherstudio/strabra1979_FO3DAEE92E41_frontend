import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    unreadCount: 0,
  },
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload
    },
    increment: (state) => {
      state.unreadCount += 1
    },
  },
})

export const { setUnreadCount, increment } = notificationSlice.actions
export default notificationSlice.reducer
