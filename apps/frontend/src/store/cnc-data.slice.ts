import { createSlice } from '@reduxjs/toolkit'

const initialState: CNCState = {
  id: '0',
  feed_rate_unit: '0',
  feed_rate: 0,
  speed: 0,
  modal_gcode: [],
  modal_data: [],
  one_shot_data: [],
  other_data: [],
  timestamp: new Date().toISOString()
}

const cncDataSlice = createSlice({
  name: 'cnc-data',
  initialState,
  reducers: {
    setCncDataState: (_, action) => {
      return action.payload
    }
  }
})

export const { setCncDataState } = cncDataSlice.actions

export default cncDataSlice.reducer
