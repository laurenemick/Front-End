/*
Style Here:
SignUp Form - Simple in Center
Check Route -> Success
Button: Loading Image -> on Success -> Success
*/

import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import SFormSchema from "../verification/signUpFormSchema"

const emptyFormValues = {
  username: "",
  email: "",
  password: "",
  vPassword: "",
  phone: "",
};

const signUpFormErrors = {
  username: "",
  email: "",
  password: "",
  vPassword: "",
  phone: "",
};

const initialDisabled = true;
const initialUsers = [];

const useStyles = makeStyles(theme => ({
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
  },
  pos: {
    marginBottom: 12,
  },

}));

export default function SignUp() {
const [formValues, setFormValues] = useState(emptyFormValues);
const [formErrors, setFormErrors] = useState(signUpFormErrors);
const [disabled, setDisabled] = useState(initialDisabled);



const onChange = (event)=>{
  const name = event.target.name
  const value = event.target.value
  yup
    .reach(SFormSchema, name)
    .validate(value)
    .then((valid) => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    })
    .catch((e) => {
      setFormErrors({
        ...formErrors,
        [name]: e.errors[0],
      });
    });
  setFormValues({
    ...formValues,
    [name]: value,
  });
}

useEffect(() => {
  SFormSchema.isValid(formValues).then(valid =>{
    setDisabled(!valid)
  })
}, [formValues])

const onSubmit = (event) =>{
  event.preventDefault()
  const newUser = {
    username: formValues.username.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    phone: formValues.phone.trim(),
  };
  axios
    .post(`https://nickussery-watermyplants.herokuapp.com/registeruser`, newUser)
    .then(res => {
      setFormValues(emptyFormValues)
    })
    .catch(e => {
      throw `Everything is broken forever: ${e}`
    })
}

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.cardroot} variant="outlined">
      
        <h1>Registration</h1>
        <form onSubmit = {onSubmit}>
        <CardContent>
      <div>
      
      <TextField
          id="outlined-full-width"
          label="username"
          name = "username"
          type = "text"
          value = {formValues.username}
          onChange = {onChange}
          style={{ margin: 8 }}
          placeholder="romanplantski"
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
          id="outlined-full-width"
          placeholder="iNeedWater@hydrate.com"
          name = "email"
          type = "email"
          value = {formValues.email}
          onChange = {onChange}
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
          id="outlined-full-width"
          label="Phone Number"
          name = "phone"
          type = "tel"
          value = {formValues.phone}
          onChange = {onChange}
          style={{ margin: 8 }}
          placeholder="(555)-555-5555"
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
          id="margin-none"
          placeholder="********"
          className={classes.textField}
          helperText="Password"
          name = "password"
          type = "password"
          value = {formValues.password}
          onChange = {onChange}
        />
        <TextField
          id="margin-none"
          placeholder="********"
          className={classes.textField}
          helperText="Verify Password"
          name = "vPassword"
          value = {formValues.vPassword}
          type = "password"
          onChange = {onChange}
        />
        <div className='errors'>
          <div>{formErrors.username}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
          <div>{formErrors.vPassword}</div>
          <div>{formErrors.phone}</div>
        </div>
      </div>
      </CardContent>
      <CardActions>
      <Button id = "submitBtn" disabled = {disabled} type = "submit">Register!</Button>
      </CardActions>
      </form>
      
      </Card>
    </div>
  );
}
