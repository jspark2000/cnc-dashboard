import dashboard, { initialState as dashboardInitialState } from './dashboard'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  dashboard
})

export const initialState = {
  dashboard: dashboardInitialState
}

export default rootReducer

export {}
