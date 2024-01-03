import ReactDOM from "react-dom"
import App from "./components/app/app"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { store } from "./store/store"



ReactDOM.render(
  <HashRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
)
