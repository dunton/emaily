import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// redux-thunk lets us write an action creator
// that doesn't  immediately return an action
// instead of 'returning' an action it 'produces' an action
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers"; // import reducers/index

const store = createStore(reducers, {}, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
