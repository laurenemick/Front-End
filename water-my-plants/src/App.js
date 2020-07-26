import React from "react";
import * as yup from "yup";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import BigButton from "./components/Button";
import Success from "./components/Success";
import SFormSchema from "./verification/signUpFormSchema";
import LFormSchema from './verification/loginFormSchema';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/* 
Check SignUp Route
*/
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
  email: '',
  password: ''
}
const loginError = {
  email: '',
  password: ''
}

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [formValues, setFormValues] = useState(emptyFormValues);
  const [SFormErrors, setSFormErrors] = useState(signUpFormErrors);
  const [users, setUsers] = useState(initialUsers);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [lFormValues, setLFormValues] = useState(loginValues);
  const [lFormErrors, setLFormErrors] = useState(loginError)

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

  const LChangeHandler = (name, value) => {
    yup
      .reach(SFormSchema, name)
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

  const LSubmit = () => {
    const user = {
      email: lFormValues.email.trim(),
      password: lFormValues.password.trim()
    }
    //axiosPost(user)
  }

  const RSubmit = () => {
    const newUser = {
      fName: formValues.fName.trim(),
      lName: formValues.lName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      phone: formValues.phone.trim(),
    };
    //axiosPost(newUser)
  };

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
            disabled = {disabled}
            values = {lFormValues}
            errors = {lFormErrors}
            inputChange = {LChangeHandler}
            submit = {LSubmit}/>
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
