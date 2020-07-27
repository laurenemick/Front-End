import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import BigButton from "./components/Button";
import Success from "./components/Success";
import SFormSchema from "./verification/signUpFormSchema";
import LFormSchema from "./verification/loginFormSchema";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


//Sign Up form values
const emptyFormValues = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  vPassword: "",
  phone: "",
};

const signUpFormErrors = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  vPassword: "",
  phone: "",
};

const loginValues = {
  email: "",
  password: "",
};
const loginError = {
  email: "",
  password: "",
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [formValues, setFormValues] = useState(emptyFormValues); //signUp form
  const [SFormErrors, setSFormErrors] = useState(signUpFormErrors); //signUp form
  const [user, setUser] = useState(initialUsers); //reusable - SignUp and Login
  const [disabled, setDisabled] = useState(initialDisabled); //reusable - signUp and login
  const [lFormValues, setLFormValues] = useState(loginValues); //login form values
  const [lFormErrors, setLFormErrors] = useState(loginError); //login errors

  //signUp changehandler
  const changeHandler = (name, value) => {
    yup
      .reach(SFormSchema, name)
      .validate(value)
      .then((valid) => {
        setSFormErrors({
          ...SFormErrors,
          [name]: "",
        });
      })
      .catch((e) => {
        setSFormErrors({
          ...SFormErrors,
          [name]: e.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  //login Change handler
  const LChangeHandler = (name, value) => {
    yup
      .reach(LFormSchema, name)
      .validate(value)
      .then((valid) => {
        setLFormErrors({
          ...lFormErrors,
          [name]: "",
        });
      })
      .catch((e) => {
        setLFormErrors({
          ...lFormErrors,
          [name]: e.errors[0],
        });
      });
    setLFormValues({
      ...lFormValues,
      [name]: value,
    });
  };
  //login submit
  const LSubmit = () => {
    const newUser = {
      email: lFormValues.email.trim(),
      password: lFormValues.password.trim(),
    };
    //axiosPost(user)//setUsers//printUser
    console.log(newUser)
    setUser(newUser)
  };
  //signup submit
  const RSubmit = () => {
    console.log("hello")
    const newUser = {
      fName: formValues.fName.trim(),
      lName: formValues.lName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      phone: formValues.phone.trim(),
    };
    //axiosPost(newUser)//setUsers//printUser
    console.log(newUser)
    setUser(newUser)
  };



  //paying attention to loginForm
  useEffect(() => {
    LFormSchema.isValid(lFormValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [lFormValues]);
  // paying attention to signup form
  useEffect(() => {
    SFormSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

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
            <SignUp
              values={formValues}
              errors={SFormErrors}
              disabled={disabled}
              inputChange={changeHandler}
              submit={RSubmit}
            />
          </Route>

          <Route path="/login">
            <LogIn
              disabled={disabled}
              values={lFormValues}
              errors={lFormErrors}
              inputChange={LChangeHandler}
              submit={LSubmit}
            />
          </Route>

          <Route path="/welcome">
            <Success user = {user}/>
          </Route>
        </Typography>
      </Container>
    </div>
  );
}

export default App;
