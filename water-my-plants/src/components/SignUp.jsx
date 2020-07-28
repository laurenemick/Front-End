import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PasswordStrengthBar from 'react-password-strength-bar';
// strangely, yup-phone only worked if Yup was capitalized
import * as yup from 'yup';

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

const validationSchema = yup.object().shape({
  personalName: yup
    .string()
    .required('Required'),
  surname: yup
    .string()
    .required('Required'),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Required"),
  mobilePhone: yup
    .string(),
  password: yup
    .string()
    .required("Required"),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

// default form values - immutable
const emptyForm = {
  personalName: "",
  surname: "",
  email: "",
  mobilePhone: "",
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
export default function SignUp (props) {
  const setAuthToken = {props},
        [formValues, setFormValues] = useState(emptyForm),
        [validationErrors, setValidationErrors] = useState(emptyErrors),
        styles = styleDefinition();

  // check for errors and save error messages every time form changes
  useEffect(() => {
    // turn off abortEarly to get all errors, not just the first one
    validationSchema.validate(formValues, {abortEarly: false})
      .then((response) => {
        setValidationErrors(emptyErrors);
      })

      .catch((error) => {
        // build new errors object one error at a time
        const errors = {};
        error.inner.forEach((error) => errors[error.path] = error.message);
        // provide error message for invalid phone number
        if ("mobilePhone" in errors) {
          // don't give error for optional mobile phone number being empty
          if (formValues.mobilePhone)
            errors.mobilePhone = "Invalid phone number";
          else
            delete errors.mobilePhone;}

        if (formValues.password && formValues.passwordScore < 3)
          errors.password = "Too weak";

        setValidationErrors(errors);
      });
  }, [formValues]);

  function formatNameWithError(field, humanReadableField) {
    // check if field is in error, and include error in prompt if so
    return field in validationErrors ?
      `${humanReadableField} (${validationErrors[field]})` :
      humanReadableField;
  }

  // handle changes to text fields
  function onTextChange(field, event) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  // handle changes in password strength
  function processPasswordScore (score) {
    setFormValues({...formValues, passwordScore: score});
  }

  // handle form submission
  function submitForm () {
    alert("submitted");
  }

  // check if form is complete and valid
  function validate() {
    // Password must be at least "good" and no error messages
    return formValues.passwordScore >= 3 && validationErrors === emptyErrors;
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
              label={formatNameWithError("personalName", "Personal Name")}
              name = "personalName"
              type = "text"
              value = {formValues.personalName}
              onChange = {(event) => onTextChange("personalName", event)} />
            <TextField
              id="surname-field"
              className={styles.textField}
              label={formatNameWithError("surname", "Surname")}
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
              label={formatNameWithError("email", "Email")}
              style={{ margin: 8 }}
            />
            <br />
            <TextField
              id="phone-number-field"
              label={formatNameWithError("mobilePhone", "Mobile Phone Number")}
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
              label={formatNameWithError("password", "Password")}
              name = "password"
              type = "password"
              value = {formValues.password}
              onChange = {(event) => onTextChange("password", event)}
            />
            <TextField
              id="verify-password-field"
              className={styles.textField}
              label={formatNameWithError("verifyPassword", "Verify Password")}
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
