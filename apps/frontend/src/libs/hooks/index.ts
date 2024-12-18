import { useDispatch } from 'react-redux'
import config from '../config'
import {
  SocketAction,
  SocketSourceType,
  type SocketMessage,
  type SystemMetricState,
  type VibrationState
} from '@/types'
import { addVibrationState } from '@/store/vibration.slice'
import { useCallback, useEffect, useRef } from 'react'
import { setSystemMetricState } from '@/store/system-metric.slice'
import { setCncDataState } from '@/store/cnc-data.slice'

const useWebSocket = () => {
  const dispatch = useDispatch()
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const subscribeToTopics = (socket: WebSocket) => {
    const topics = [
      SocketSourceType.VIBRATION,
      SocketSourceType.CNC,
      SocketSourceType.STATUS
    ]

    topics.forEach((topic) => {
      socket.send(
        JSON.stringify({
          action: SocketAction.SUBSCRIBE,
          source: topic
        })
      )
    })
  }

  const connectWebSocket = useCallback(() => {
    try {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        return
      }

      const socket = new WebSocket(config.WEBSOCKET_URL)

      socket.onopen = () => {
        console.log('WebSocket connected')
        subscribeToTopics(socket)
      }

      socket.onmessage = (event) => {
        const { data, source } = JSON.parse(event.data) as SocketMessage

        switch (source) {
          case SocketSourceType.VIBRATION:
            dispatch(addVibrationState(data as VibrationState))
            return
          case SocketSourceType.CNC:
            dispatch(setCncDataState(data as CNCState))
            return
          case SocketSourceType.STATUS:
            dispatch(setSystemMetricState(data as SystemMetricState))
            return
          default:
            console.log('unsupported socket source type')
            return
        }
      }

      socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.reason)
        socketRef.current = null

        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...')
          connectWebSocket()
        }, config.WEBSOCKET_RECONNECTION_DELAY)
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
        socket.close()
      }

      socketRef.current = socket
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)

      reconnectTimeoutRef.current = setTimeout(
        connectWebSocket,
        config.WEBSOCKET_RECONNECTION_DELAY
      )
    }
  }, [dispatch])

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [connectWebSocket])

  return socketRef.current
}

export default useWebSocket
