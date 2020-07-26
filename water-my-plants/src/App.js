import React from "react";
import NavBar from "./components/NavBar";
import LogIn from './components/Login';
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import BigButton from "./components/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Success from './components/Success'
import SFormSchema from './verification/signUpFormSchema'
import * as yup from 'yup'
/* 
Style Here:
Check SignUp Route
*/
const emptyFormValues = {
  fName: '',
  lName: '',
  email: '',
  password: '',
  vPassword: '',
  phone: ''
}

const signUpFormErrors = {
  fName: '',
  lName: '',
  email: '',
  password: '',
  vPassword: '',
  phone: ''
}

const initialUsers = []
const initialDisabled = true;


function App() {
  const [formValues, setFormValues] = useState(emptyFormValues)
  const [SFormErrors, setSFormErrors] = useState(signUpFormErrors)
  const [users, setUsers] = useState(initialUsers)
  const [disabled, setDisabled] = useState(initialDisabled)

  const changeHandler = (name, value) => {
    yup
    .reach(SFormSchema, name)
    .validate(value)
    .then(valid => {
      setSFormErrors({
        ...SFormErrors, [name]: ''
      })
    })
    .catch(e => {
      setSFormErrors({
        ...SFormErrors, [name]: e.errors[0]
      })
    })
    setFormValues({
      ...formValues, [name]: value
    })

  }

  const RSubmit = () => {
    const newUser = {
      fName: formValues.fName.trim(),
      lName: formValues.lName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      phone: formValues.phone.trim()
    }
  }

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
              values = {formValues}
              errors = {SFormErrors}
              disabled = {disabled}
              inputChange = {changeHandler}
              submit = {RSubmit}/>
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
