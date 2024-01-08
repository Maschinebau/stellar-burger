import { WebSocketPayload } from "./webSocketMiddleware"

export const webSocketConnect = (payload: WebSocketPayload) => ({
  type: "WEBSOCKET_CONNECT",
  payload
})

export const webSocketDisconnect = () => ({
  type: "WEBSOCKET_DISCONNECT",
})
