import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from 'axios';
import LFormSchema from '../verification/loginFormSchema';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const loginValues = {
  email: '',
  password: ''
}
const loginError = {
  email: '',
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
      const user = {
        email: lFormValues.email.trim(),
        password: lFormValues.password.trim()
      }
      axios
      .post(`https://nickussery-watermyplants.herokuapp.com/login`, user)
      .then(res => {
        setLFormValues(loginValues)
      })
      .catch(e => {
        throw e
      })

  };

  useEffect(() => {
    LFormSchema.isValid(lFormValues).then(valid => {
      setDisabled(!valid)
    })
  }, [lFormValues])

  return (
    <div className={classes.root}>
      <Card className={classes.cardroot} variant="outlined">
        <h1>Log In</h1>
          <CardContent>
            <div>
              <TextField
                id="email-field"
                label="Email"
                type="email"
                name="email"
                value={lFormValues.email}
                onChange={onChange}
                style={{ margin: 8 }}
                placeholder="iNeedWater@hydrate.com"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
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
              <div>{lFormErrors.email}</div>
              <div>{lFormErrors.password}</div>
            </div>
          </CardContent>
          <CardActions>
            <Button id="submitBtn" type="submit" disabled={disabled}>
              Log In
            </Button>
          </CardActions>
      </Card>
    </div>
  );
}
