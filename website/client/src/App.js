import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "./components/Feed";
import Search from "./components/Search/search";
import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/signUp";
import { TopBar } from "./components/TopBar";
import UserProfile from "./components/UserProfile";
import { CheckSignIn } from "./contexts/auth";

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/signIn">
          <SignIn />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/">
          <CheckSignIn>
            <Feed />
          </CheckSignIn>
        </Route>
        <Route path="/userProfile/:userId">
          <CheckSignIn>
            <UserProfile />
          </CheckSignIn>
        </Route>
        <Route exact path="/users/search">
          <CheckSignIn>
            <Search />
          </CheckSignIn>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
