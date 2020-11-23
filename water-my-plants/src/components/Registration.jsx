import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PasswordStrengthBar from 'react-password-strength-bar';
import MuiPhoneInput from 'material-ui-phone-number';
import * as yup from 'yup';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#081c15",
    },
    secondary: {
      main: '#2d6a4f',
    },
  },
});

const styleDefinition = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // width: "35ch"
  },
  errors: {
    color: "red",
    paddingTop: "4%",
  }
}));

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9-_]+$/, "Alphanumeric characters and dashes only")
    .required('Required'),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required"),
  phone: yup
    .string()
    .matches(
      /^$|^[+](1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/,
      "Invalid phone number")
    .required("Required"),
  password: yup
    .string()
    .max(320, "Why so long?")
    .required("Required"),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

class NewUser {
  constructor (formValues) {
    this.username = formValues.username;
    this.email = formValues.email;
    this.phone = formValues.phone;
    this.password = formValues.password;
  }
}

// default form values - immutable
const emptyForm = {
  username: "",
  email: "",
  phone: "",
  password: "",
  verifyPassword: "",
  passwordScore: 0,
  submitDisabled: true
};
Object.freeze(emptyForm);

// having a specific empty object instance makes for easier logical operations
const emptyErrors = {};
Object.freeze(emptyErrors);

// Sign up page
export default function Registration (props) {
  const setAuthToken = {props},
        [formValues, setFormValues] = useState(emptyForm),
        [validationErrors, setValidationErrors] = useState(emptyErrors),
        styles = styleDefinition();
  const history = useHistory();

  // check for errors and save error messages every time form changes
  useEffect(() => {
    // turn off abortEarly to get all errors, not just the first one
    validationSchema.validate(formValues, {abortEarly: false})
      .then(() => {
        // check for weak password here because .catch won't run if
        // the weak password is the only error
        if (formValues.passwordScore < 3)
          setValidationErrors({password: "Too weak"});
        else
          setValidationErrors(emptyErrors);
      })

      .catch((error) => {
        // build new errors object one error at a time
        const errors = {};

        // check for weak password separately, because yup don't know how
        if (formValues.passwordScore < 3)
          errors.password = "Too weak";

        error.inner.forEach((error) => errors[error.path] = error.message);

        setValidationErrors(errors);
      });
  }, [formValues]);

  function formatNameWithError(field, humanReadableField) {
    // check if field is in error, and include error in prompt if so
    return field in validationErrors ?
      `${humanReadableField} (${validationErrors[field]})` :
      humanReadableField;
  }

  // handle changes to phone number
  function onPhoneChange (number) {
    setFormValues({...formValues, phone: number});
  }

  // handle changes to text fields
  function onTextChange(field, event) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  // handle changes in password strength
  function onChangeScore(score) {
    setFormValues({...formValues, passwordScore: score});
  }

  // handle form submission
  function submitForm() {
    // alert("submitted");
    const submittedUser = new NewUser(formValues);
    axios
      .post('https://nickussery-watermyplants.herokuapp.com/registeruser', submittedUser)
      .then(res => {
        console.log(res)
        history.push('/login')
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <div className={styles.root} style={{marginTop:"6%"}}>
      <ThemeProvider theme={theme}>
        <Card style={{padding:"0 4% 0 4%", margin:"2%"}}>
          <CardContent>
            <h1>Registration</h1>
            <div>
              <TextField
                id="username-field"
                label={formatNameWithError("username", "Username")}
                name = "username"
                type = "text"
                value = {formValues.username}
                onChange = {(event) => onTextChange("username", event)}
                fullWidth
                margin="normal"
                variant="outlined"
                style={{ margin: 8 }} 
              />
              <br />
              <TextField
                id="email-field"
                name = "email"
                type = "email"
                value = {formValues.email}
                onChange = {(event) => onTextChange("email", event)}
                fullWidth
                margin="normal"
                variant="outlined"
                label={formatNameWithError("email", "Email")}
                style={{ margin: 8 }} 
              />
              <br />
              <MuiPhoneInput
                defaultCountry="us"
                regions={["north-america", "caribbean"]}
                id="phone-number-field"
                label={formatNameWithError("phone", "Phone Number")}
                name = "phone"
                value = {formValues.phone}
                onChange = {onPhoneChange}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined" 
              />
              <br />
              <TextField
                id="password-field"
                label={formatNameWithError("password", "Password")}
                name = "password"
                type = "password"
                variant="outlined" 
                fullWidth
                margin="normal"
                value = {formValues.password}
                onChange = {(event) => onTextChange("password", event)} 
                style={{margin: 8 }}
              />
              <TextField
                id="verify-password-field"
                label={formatNameWithError("verifyPassword", "Verify Password")}
                name = "verifyPassword"
                value = {formValues.vPassword}
                type = "password"
                variant="outlined" 
                fullWidth
                margin="normal"
                onChange = {(event) => onTextChange("verifyPassword", event)} 
                style={{paddingBottom: "8%", margin: 8}}
              />
              <PasswordStrengthBar password={formValues.password} onChangeScore={onChangeScore}/>
            </div>
            <div style={{display: "flex", justifyContent: "center", margin: "4%"}}>
              <CardActions>
                <Button 
                  id="submit-form-button"
                  variant="contained"
                  disabled = {validationErrors !== emptyErrors}
                  onClick={submitForm}
                  // className={styles.textField}
                  color="primary"
                >   
                  Sign Up
                </Button>
              </CardActions>
            </div>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}

//  LocalWords:  verifyPassword TextField CardActions CardContent
//  LocalWords:  abortEarly
