import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Required"),
  password: yup
    .string()
    .required("Required")
});

// default form values - immutable
const emptyForm = {
  email: "",
  password: "",
  submitDisabled: true
};
Object.freeze(emptyForm);

// having a specific empty object instance makes for easier logical operations
const emptyErrors = {};
Object.freeze(emptyErrors);

// Sign up page
export default function LogIn (props) {
  const setAuthToken = {props},
        [formValues, setFormValues] = useState(emptyForm),
        [validationErrors, setValidationErrors] = useState(emptyErrors),
        styles = styleDefinition();

  // check for errors and save error messages every time form changes
  useEffect(() => {
    // turn off abortEarly to get all errors, not just the first one
    validationSchema.validate(formValues, {abortEarly: false})
      .then(() => {
        setValidationErrors(emptyErrors);
      })

      .catch((error) => {
        // build new errors object one error at a time
        const errors = {};
        error.inner.forEach((error) => errors[error.path] = error.message);

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
  // handle form submission
  function submitForm () {
    alert("submitted");
  }

  return (
    <div className={styles.root}>
      <Card className={styles.cardroot} variant="outlined">

        <h1>Log In</h1>
        <CardContent>
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
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained"
                  disabled = {validationErrors !== emptyErrors}
                  onClick={submitForm}>
            Log In
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

//  LocalWords:  verifyPassword TextField CardActions CardContent
//  LocalWords:  abortEarly mobilePhone
