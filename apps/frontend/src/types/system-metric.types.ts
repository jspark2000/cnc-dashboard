export interface SystemMetricState {
  cpu: {
    cpu_percent: number
    cpu_percent_per_core: number[]
    boot_time: number
    cup_temp: number
  }
  memory: {
    total: number
    percent: number
  }
  disk_usage: {
    [path: string]: {
      total: number
      used: number
      free: number
      percent: number
    }
  }
  net_io: {
    bytes_sent: number
    bytes_recv: number
    packets_sent: number
    packets_recv: number
    errin: number
    errout: number
    dropin: number
    dropout: number
    wifi_strength: number | null
  }
  process_list: any[]
}
