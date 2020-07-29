import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// Components
import Dashboard from './components/Dashboard';
import NavBar from "./components/NavBar";
import Login from "./components/Login.js";
import Registration from "./components/Registration";
// import About from './components/About';
// import MarketingPage from './MarketingPage';

// Utils
import { PrivateRoute } from './utils/PrivateRoute';

import './App.css';

export default function App() {
  // authentication token associated with session, currently a
  // placeholder until we get the proper endpoints
  const [authToken, setAuthToken] = useState({});

  // universals set in main App: Container and type styling, routes to
  // individual page components.
  return (
    <div className="App">
      <NavBar />
      <CssBaseline />
      <Container style={{ maxWidth: "lg" }}>
        <Typography
          component="div"
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#cfe8fc",
            height: "100vh",
            opacity: "80%",
          }}
        >
      <div className='App'>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          {/*<Route exact path='/about' component={About} />
          <Route exact path='/home' component={MarketingPage} /> */}
        </Switch>
      </div>
        </Typography>
      </Container>
    </div>
  );
}
