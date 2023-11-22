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
import userReducer from './store/slices/userSlice'
import { rowserRouter as Router } from "react-router-dom"

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    user: userReducer
  },
  devTools: true,
  middleware: [thunk]
})

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
)

reportWebVitals()
