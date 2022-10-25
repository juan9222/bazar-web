import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./root";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import './utils/styles/styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Root />
);

// If you want to start measuring performance in your RouteProvider, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
