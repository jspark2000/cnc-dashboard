import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { VibrationState } from '@/types'

const initialState: VibrationState = {
  x: [0],
  y: [0],
  z: [0],
  time: [new Date().toISOString()],
  current: [0]
}

const vibrationSlice = createSlice({
  name: 'vibration',
  initialState,
  reducers: {
    addVibrationState: (origin, action: PayloadAction<VibrationState>) => {
      return {
        x: [...origin.x, ...action.payload.x].slice(-26000),
        y: [...origin.y, ...action.payload.y].slice(-26000),
        z: [...origin.z, ...action.payload.z].slice(-26000),
        current: [...origin.current, ...action.payload.current].slice(-26000),
        time: [...origin.time, ...action.payload.time].slice(-26000)
      }
    }
  }
})

export const { addVibrationState } = vibrationSlice.actions

export default vibrationSlice.reducer
