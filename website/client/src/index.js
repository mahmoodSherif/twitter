import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/feed">feed</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/feed">
          <App />
        </Route>
        <Route exact path="/profile">

        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
