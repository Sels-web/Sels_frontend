import React from "react";
import ReactDOM from "react-dom";
import './sass/app.sass'
import App from "./App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)