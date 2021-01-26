import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "./components/Feed";
import Search from "./components/Search/search";
import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/signUp";
import { TopBar } from "./components/TopBar";
import UserProfile from "./components/UserProfile";

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
          <Feed />
        </Route>
        <Route path="/userProfile/:userId">
          <UserProfile />
        </Route>
        <Route exact path="/users/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
