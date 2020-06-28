import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./app";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// establishes socket connection
import "./socket";

const client = new ApolloClient({
  uri: "http://localhost:8080/api",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("app")
);
