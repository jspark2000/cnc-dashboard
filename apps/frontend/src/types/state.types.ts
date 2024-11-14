import type { SocketDataType } from './socket.types'

export interface VibrationState extends SocketDataType {
  current: number[]
  time: string[]
  x: number[]
  y: number[]
  z: number[]
}
