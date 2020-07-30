import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import BigButton from "./components/Button";
import Success from "./components/Success";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function App() {

  return (
    <div className="App">
      <NavBar />
      <CssBaseline />
      <Container component="div"
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#DBF9F0",
            height: "95vh",
            opacity: "90%",
            maxWidth: 'lg',
          }}>
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
      </Container>
      <footer position="fixed"
        style={{ background: "#16302B", boxShadow: "none", height:'5vh'}}></footer>
    </div>
  );
}

export default App;
