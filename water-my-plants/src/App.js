import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import BigButton from "./components/Button";
import Success from "./components/Success";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

function App() {

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
          <Route exact path="/">
            <BigButton />
          </Route>

          <Route path="/registration">
            <SignUp />
          </Route>

          <Route path="/login">
            <LogIn />
          </Route>

          <Route path="/welcome">
            <Success />
          </Route>
        </Typography>
      </Container>
    </div>
  );
}

export default App;
