import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/signUp";
import AuthProvider from "./contexts/auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/feed">feed</Link>
            </li>
            <li>
              <Link to="/profile">profile</Link>
            </li>
            <li>
              <Link to="/signIn">signIn</Link>
            </li>
            <li>
              <Link to="/signUp">signUp</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/feed">
            <App />
          </Route>
          <Route exact path="/profile"></Route>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
