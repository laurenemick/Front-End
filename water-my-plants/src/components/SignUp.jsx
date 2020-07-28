import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Map } from "immutable";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import PasswordStrengthBar from 'react-password-strength-bar';

// courtesy of style master Ava
const styleDefinition = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch"
  },
  cardroot: {
    minWidth: 275,
  },

  title: {
    fontSize: 14,
  }
}));

// default form values
const emptyForm = Map({
  personalName: "",
  surname: "",
  email: "",
  mobilePhone: "",
  password: "",
  verifyPassword: "",
  passwordStrength: 0,
  submitDisabled: true
});

// Sign up page
export default function SignUp (props) {
  const setAuthToken = {props},
        [formValues, setFormValues] = useState(emptyForm),
        styles = styleDefinition();

  // handle changes to text fields
  function onTextChange(field, event) {

  }

  // handle changes in password strength
  function processPasswordScore (event) {

  }

  // handle form submission
  function submitForm () {

  }

  return (
    <div className={styles.root}>
      <Card className={styles.cardroot} variant="outlined">

        <h1>Registration</h1>
        <CardContent>
          <div>
            <TextField
              id="personal-name-field"
              className={styles.textField}
              helperText="Personal Name"
              name = "personalName"
              type = "text"
              value = {formValues.personalName}
              onChange = {(event) => onTextChange("personalName", event)} />
            <TextField
              id="surname-field"
              className={styles.textField}
              helperText="Surname"
              name = "surname"
              type = "text"
              value = {formValues.surname}
              onChange = {(event) => onTextChange("surname", event)}
            />
          </div>
          <br />
          <div>
            <TextField
              id="email-field"
              name = "email"
              type = "email"
              value = {formValues.email}
              onChange = {(event) => onTextChange("email", event)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              label="Email"
              style={{ margin: 8 }}
            />
            <br />
            <TextField
              id="phone-number-field"
              label="Mobile Phone Number"
              name = "mobilePhone"
              type = "tel"
              value = {formValues.phone}
              onChange = {(event) => onTextChange("mobilePhone", event)}
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          </div>
          <br />
          <div>
            <TextField
              id="password-field"
              className={styles.textField}
              helperText="Password"
              name = "password"
              type = "password"
              value = {formValues.password}
              onChange = {(event) => onTextChange("password", event)}
            />
            <TextField
              id="verify-password-field"
              className={styles.textField}
              helperText="Verify Password"
              name = "verifyPassword"
              value = {formValues.vPassword}
              type = "password"
              onChange = {(event) => onTextChange("verifyPassword", event)}
            />
            <PasswordStrengthBar password={formValues.password}
                                 onChangeScore={processPasswordScore}/>

          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained"
                  disabled = {formValues.disabled}
                  onClick={submitForm}>
            Register!
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

//  LocalWords:  verifyPassword TextField CardActions CardContent
