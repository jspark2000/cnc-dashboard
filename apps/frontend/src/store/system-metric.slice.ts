import type { SystemMetricState } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: SystemMetricState = {
  cpu: {
    cpu_percent: 0,
    cpu_percent_per_core: [0],
    boot_time: 0,
    cup_temp: 0
  },
  memory: {
    total: 0,
    percent: 0
  },
  disk_usage: {
    '/null': {
      total: 0,
      used: 0,
      free: 0,
      percent: 0
    }
  },
  net_io: {
    bytes_sent: 0,
    bytes_recv: 0,
    packets_sent: 0,
    packets_recv: 0,
    errin: 0,
    errout: 0,
    dropin: 0,
    dropout: 0,
    wifi_strength: null
  },
  process_list: [],
  time: new Date().toLocaleString()
}

const systemMetricSlice = createSlice({
  name: 'system-metric',
  initialState,
  reducers: {
    setSystemMetricState: (_, action) => {
      return {
        ...action.payload,
        time: new Date().toLocaleString()
      }
    }
  }
})

export const { setSystemMetricState } = systemMetricSlice.actions

export default systemMetricSlice.reducer
