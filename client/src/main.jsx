import { StrictMode } from "react";
import {BrowserRouter} from "react-router-dom"
import { App } from "./App.jsx";
import ReactDOM from "react-dom/client"

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
