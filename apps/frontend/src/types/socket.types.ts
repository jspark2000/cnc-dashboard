export enum SocketAction {
  SUBSCRIBE = 'subscribe'
}

export enum SocketSourceType {
  CNC_REALTIME = 'cnc_realtime',
  CNC = 'cnc',
  VIBRATION = 'vibration',
  STATUS = 'status'
}

export interface SocketDataType {}

export interface SocketMessage<T extends SocketDataType = SocketDataType> {
  source: SocketSourceType
  data: T
}
