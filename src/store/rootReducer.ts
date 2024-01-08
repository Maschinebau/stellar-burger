import { combineReducers } from "@reduxjs/toolkit"
import ingredientsReducer from "./slices/ingredientsSlice"
import constructorReducer from "./slices/constructorSlice"
import orderReducer from "./slices/orderSlice"
import currentIngredientReducer from "./slices/currentIngredientSlice"
import userReducer from "./slices/userSlice"
import allOrdersReducer from "./slices/allOrdersSlise"

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentIngredient: currentIngredientReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  allOrders: allOrdersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
