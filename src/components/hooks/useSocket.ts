import { useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch"
import { clearSocket, setSocket } from "../../store/slices/websocketSlice"

export const useSocket = (url: string, onMessage: (event: MessageEvent) => void) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const socket = new WebSocket(url)
    socket.onmessage = onMessage
    dispatch(setSocket(socket))

    return () => {
      socket.close()
      dispatch(clearSocket())
    }
  }, [dispatch, url, onMessage])
}
