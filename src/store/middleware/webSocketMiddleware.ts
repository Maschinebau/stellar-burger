import { Middleware, MiddlewareAPI } from "redux"
import { updateOrders } from "../slices/allOrdersSlise"
import { updateUserOrders } from "../slices/userSlice"
import { RootState } from "../rootReducer"
import { useAppDispatch } from "../../components/hooks/useAppDispatch"

export type WebSocketPayload = {
  url: string
  actionType: string
}

export type WebSocketAction = {
  type: string
  payload: WebSocketPayload
}
// @ts-ignore
const socketMiddleware: Middleware = () => {
  let socket: WebSocket | null

  const onOpen = (store: MiddlewareAPI) => (event: Event) => {
    // события при открытии
    // console.log("WebSocket opened:", event)
  }

  const onClose = (store: MiddlewareAPI) => (event: Event) => {
    // события при закрытии соединения
    // console.log("WebSocket closed:", event)
  }

  const onMessage = (store: MiddlewareAPI, action: WebSocketAction) => (event: MessageEvent) => {
    const data = JSON.parse(event.data)

    switch (action.payload.actionType) {
      case "ORDERS":
        store.dispatch(updateOrders(data))
        break
      case "USER_ORDERS":
        store.dispatch(updateUserOrders(data))
        break
      // тут можем работать с входящими данными
      default:
        break
    }
  }

  return (store: MiddlewareAPI) => (next) => (action: WebSocketAction) => {
    switch (action.type) {
      case "WEBSOCKET_CONNECT":
        if (socket) {
          socket.close()
        }
        socket = new WebSocket(action.payload.url)
        socket.onmessage = onMessage(store, action)
        socket.onclose = onClose(store)
        socket.onopen = onOpen(store)
        break

      case "WEBSOCKET_DISCONNECT":
        if (!socket) {
          return
        }
        socket.close()
        break

      // тут можем добавить новые кейсы
      default:
        return next(action)
    }
  }
}
// @ts-ignore
export const webSocketMiddleware: Middleware = socketMiddleware()
