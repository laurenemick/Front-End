import React from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Dashboard from './components/Dashboard';
import NavBar from "./components/NavBar";
import Login from "./components/Login.js";
import Registration from "./components/Registration";

// Utils
import { PrivateRoute } from './utils/PrivateRoute';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <CssBaseline />
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
        </Switch>
    </div>
  );
}
