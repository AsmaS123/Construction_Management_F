import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./error.component";
// import '../../node_modules/react-toastify/dist/ReactToastify.css';
import { Backdrop, CircularProgress } from "@mui/material";
import ".././node_modules/react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const styles = {
  color: "red",
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallbackRender={ErrorComponent}>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
