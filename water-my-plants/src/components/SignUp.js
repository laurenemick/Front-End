/*
Style Here:
SignUp Form - Simple in Center
Check Route -> Success
Button: Loading Image -> on Success -> Success
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'

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

export default function SignUp(props) {
const {values, errors, disabled, inputChange, submit} = props

const onChange = (event)=>{
  const name = event.target.name
  const value = event.target.value
  inputChange(name, value)
}

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.cardroot} variant="outlined">
      
        <h1>Registration</h1>
        <form>
        <CardContent>
      <div>
      
        <TextField
          id="margin-none"
          placeholder="Roman"
          className={classes.textField}
          helperText="First Name"
          name = "fName"
          type = "text"
          value = {values.fName}
          onChange = {onChange}
        />
        <TextField
          id="margin-none"
          placeholder="Plantski"
          className={classes.textField}
          helperText="Last Name"
          name = "lName"
          type = "text"
          value = {values.lName}
          onChange = {onChange}
        />
      </div>
<br />
      <div>
        <TextField
          id="outlined-full-width"
          placeholder="iNeedWater@hydrate.com"
          name = "email"
          type = "email"
          value = {values.email}
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
          value = {values.phone}
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
          value = {values.password}
          onChange = {onChange}
        />
        <TextField
          id="margin-none"
          placeholder="********"
          className={classes.textField}
          helperText="Verify Password"
          name = "vPassword"
          value = {values.vPassword}
          type = "password"
          onChange = {onChange}
        />
      </div>
      </CardContent>
      <CardActions>
      <Button><Link to="/welcome"> Register! </Link> </Button>
      </CardActions>
      </form>
      
      </Card>
    </div>
  );
}
