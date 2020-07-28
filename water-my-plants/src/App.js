import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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

          <Route path="/registration">
            <SignUp setAuthToken={setAuthToken}/>
          </Route>

          <Route path="/login">
            <LogIn setAuthToken={setAuthToken}/>
          </Route>
        </Typography>
      </Container>
    </div>
  );
}
