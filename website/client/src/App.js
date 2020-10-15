import React, { useContext } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Feed from "./components/Feed";
import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/signUp";
import { AuthContext } from "./contexts/auth";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">feed</Link>
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
        <Route exact path="/">
          {currentUser.user ? <Feed /> : <SignIn />}
        </Route>
        <Route exact path="/signIn">
          <SignIn />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
