import React, {useState, useEffect} from "react";
import * as yup from 'yup';
// import axios from 'axios';
import LFormSchema from '../verification/loginFormSchema';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const loginValues = {
  username: '',
  password: ''
}
const loginError = {
  username: '',
  password: ''
}
const initialDisabled = true;

const useStyles = makeStyles((theme) => ({
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
    width: "25ch",
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

export default function LogIn() {
  const history = useHistory();
  const classes = useStyles();
  const [disabled, setDisabled] = useState(initialDisabled);
  const [lFormValues, setLFormValues] = useState(loginValues);
  const [lFormErrors, setLFormErrors] = useState(loginError)

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

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

  const onSubmit = (event) => {
    event.preventDefault();
      localStorage.removeItem('token')
      const user = {
        username: lFormValues.username.trim(),
        password: lFormValues.password.trim()
      }
      axiosWithAuth()
        .post('/login', `grant_type=password&username=${user.username}&password=${user.password}`, {
          headers: {
            Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.access_token)
          history.push('/')
        })
        .catch(e => {
          throw `Everything is broken forever: ${e}`
        })
  };

  useEffect(() => {
    LFormSchema.isValid(lFormValues).then(valid => {
      setDisabled(!valid)
    })
  }, [lFormValues])

  useEffect(() => {
    console.log(lFormValues)
  }, [lFormValues])

  return (
    <div className={classes.root}>
      <Card className={classes.cardroot} variant="outlined">
        <h1>Log In</h1>
          <CardContent>
            <div>
              <TextField
                id="username-field"
                className={classes.textField}
                label="username"
                type="username"
                name="username"
                value={lFormValues.username}
                onChange={onChange}
                placeholder="RomanPlantski"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="password-field"
                placeholder="********"
                className={classes.textField}
                helperText="Password"
                name="password"
                type="password"
                value={lFormValues.password}
                onChange={onChange}
              />
            </div>
            <div className="errors">
              <div>{lFormErrors.username}</div>
              <div>{lFormErrors.password}</div>
            </div>
          </CardContent>
          <CardActions>
            <Button id="submit-button"
                    variant="contained"
                    onClick={onSubmit}
                    disabled={disabled}>
              Log In
            </Button>
          </CardActions>
      </Card>
    </div>
  );
}
