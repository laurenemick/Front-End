import React from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

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
      {/* <Container style={{
        display: "flex",
        justifyContent: "space-evenly",
        height: "95vh",
        maxWidth: 'lg',
      }}> */}
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
        </Switch>
      {/* </Container> */}
      {/* <footer position="fixed"
              style={{ background: "#16302B",
                       boxShadow: "none",
                       height:'5vh'}}>
      </footer> */}
    </div>
  );
}
