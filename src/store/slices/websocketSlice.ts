import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type WebsocketState = {
  socket: WebSocket | null
}

const initialState: WebsocketState = {
  socket: null
}

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<WebSocket>) => {
      state.socket = action.payload
    },
    clearSocket: (state) => {
      if (state.socket) {
        state.socket.close()
        state.socket = null
      }
    }
  }
})

export const { setSocket, clearSocket } = websocketSlice.actions
export default websocketSlice.reducer
