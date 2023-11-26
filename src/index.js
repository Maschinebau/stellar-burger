import ReactDOM from "react-dom"
import App from "./components/app/app"
import reportWebVitals from "./reportWebVitals"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import ingredientsReducer from "./store/slices/ingredientsSlice"
import constructorReducer from "./store/slices/constructorSlice"
import orderReducer from "./store/slices/orderSlice"
import currentIngredientReducer from "./store/slices/currentIngredientSlice"
import userReducer from "./store/slices/userSlice"
import { HashRouter } from "react-router-dom"
import allOrdersReducer from "./store/slices/allOrdersSlise"

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    user: userReducer,
    allOrders: allOrdersReducer,
  },
  devTools: true,
  middleware: [thunk]
})

ReactDOM.render(
  <HashRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
)

reportWebVitals()
