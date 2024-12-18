import { configureStore } from '@reduxjs/toolkit'
import systemMetricReducer from './system-metric.slice'
import vibrationReducer from './vibration.slice'
import settingReducer from './setting-state.slice'
import cncDataReducer from './cnc-data.slice'

const store = configureStore({
  reducer: {
    systemMetric: systemMetricReducer,
    vibration: vibrationReducer,
    setting: settingReducer,
    cncData: cncDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
