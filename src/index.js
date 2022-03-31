import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import SimpleReactLightbox from "simple-react-lightbox";

import "./index.css";
import App from "./App";
import store from "./store/Store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SimpleReactLightbox>
        <App />
      </SimpleReactLightbox>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
