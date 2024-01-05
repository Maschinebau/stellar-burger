import { combineReducers } from "@reduxjs/toolkit"
import ingredientsReducer from "./slices/ingredientsSlice"
import constructorReducer from "./slices/constructorSlice"
import orderReducer from "./slices/orderSlice"
import currentIngredientReducer from "./slices/currentIngredientSlice"
import userReducer from "./slices/userSlice"
import allOrdersReducer from "./slices/allOrdersSlise"
import websocketReducer from "./slices/websocketSlice"

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentIngredient: currentIngredientReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  allOrders: allOrdersReducer,
  websocket: websocketReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
