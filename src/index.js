import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// const title = 'React с Webpack и Babel';

// const root = ReactDOM.createRoot(document.getElementById('app'));
// root.render(<h1>{title}</h1>); 






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
