import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import LFormSchema from '../verification/loginFormSchema';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const loginValues = {
  username: '',
  password: ''
}
const loginError = {
  username: '',
  password: '',
  loginfail: '',
}
const initialDisabled = true;

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: "8%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15%",
    }
  },
  card: {
    padding:"0 4% 4% 4%", 
    margin:"6% 2% 0",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  errors: {
    color: "red",
    paddingTop: "4%",
  }
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
          localStorage.setItem('token', res.data.access_token)
          history.push('/')
        })
        .catch(err => {
          setLFormErrors({loginfail: "Invalid username and/or password."});
      })
  };

  useEffect(() => {
    LFormSchema.isValid(lFormValues).then(valid => {
      setDisabled(!valid)
    })
  }, [lFormValues])

  useEffect(() => {
    
  }, [lFormValues])

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Card className={classes.card}>
          <CardContent>
            <h1>Water Me</h1>
            <div>
              <TextField
                id="username-field"
                className={classes.textField}
                type="username"
                name="username"
                value={lFormValues.username}
                onChange={onChange}
                placeholder="Username"
                margin="normal"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="password-field"
                placeholder="Password"
                className={classes.textField}
                name="password"
                type="password"
                value={lFormValues.password}
                onChange={onChange}
                variant="outlined"
              />
            </div>
            <div className={classes.errors}>
              <Typography variant="body2">{lFormErrors.username}</Typography>
              <Typography variant="body2">{lFormErrors.password}</Typography>
              <Typography variant="body2">{lFormErrors.loginfail}</Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
              <CardActions>
                <Button 
                  id="submit-button"
                  color="primary"
                  variant="contained"
                  onClick={onSubmit}
                  disabled={disabled}
                  className={classes.textField}
                >
                  Log In
                </Button>
              </CardActions>
            </div>
            <Typography variant="body2" align="center" color="primary" style={{fontWeight: "600", marginTop:"4%"}}>
              Don't have an account?&nbsp;
              <Link to="/registration" style={{color: "#2d6a4f"}}>
                  Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
