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

export default function SignUp() {
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
        />
        <TextField
          id="margin-none"
          placeholder="Plantski"
          className={classes.textField}
          helperText="Last Name"
        />
      </div>
<br />
      <div>
        <TextField
          id="outlined-full-width"
          label="Email"
          style={{ margin: 8 }}
          placeholder="iNeedWater@hydrate.com"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
<br />
        <TextField
          id="outlined-full-width"
          label="Phone Number"
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
        />
        <TextField
          id="margin-none"
          placeholder="********"
          className={classes.textField}
          helperText="Verify Password"
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
