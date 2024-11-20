import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { VibrationState } from '@/types'
import config from '@/libs/config'

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
        x: [...origin.x, ...action.payload.x].slice(-config.VIBRATION_HZ * 10),
        y: [...origin.y, ...action.payload.y].slice(-config.VIBRATION_HZ * 10),
        z: [...origin.z, ...action.payload.z].slice(-config.VIBRATION_HZ * 10),
        current: [...origin.current, ...action.payload.current].slice(
          -config.VIBRATION_HZ * 10
        ),
        time: [...origin.time, ...action.payload.time].slice(
          -config.VIBRATION_HZ * 10
        )
      }
    }
  }
})

export const { addVibrationState } = vibrationSlice.actions

export default vibrationSlice.reducer
