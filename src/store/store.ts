import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { webSocketMiddleware } from "./middleware/webSocketMiddleware"

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware),
})

export type AppDispatch = typeof store.dispatch
