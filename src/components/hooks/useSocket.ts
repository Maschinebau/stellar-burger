import { useCallback, useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { clearSocket, setSocket } from "../../store/slices/websocketSlice"

export const useSocket = (url: string, onMessage: (event: MessageEvent) => void) => {
  const dispatch = useAppDispatch()
  const memoizedOnMessage = useCallback(onMessage, [onMessage])

  useEffect(() => {
    const socket = new WebSocket(url)
    socket.onmessage = memoizedOnMessage
    dispatch(setSocket(socket))

    return () => {
      socket.close()
      dispatch(clearSocket())
    }
  }, [dispatch, url, memoizedOnMessage])
}
