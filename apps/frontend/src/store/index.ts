import { configureStore } from '@reduxjs/toolkit'
import vibrationReducer from './vibration.slice'

const store = configureStore({
  reducer: {
    vibration: vibrationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
