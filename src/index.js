import ReactDOM from "react-dom"
import App from "./components/app/app"
import reportWebVitals from "./reportWebVitals"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { HashRouter } from "react-router-dom"
import rootReducer from "./store/rootReducer"

export const store = configureStore({
  reducer: rootReducer,
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
