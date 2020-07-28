import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Map } from "immutable";

// courtesy of style master Ava
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

// default form values
const emptyForm = Map({
  personalName: "",
  surname: "",
  email: "",
  mobilePhone: "",
  password: "",
  verifyPassword: ""
});

// Sign up page
export default function SignUp (props) {
  const setAuthToken = {props};
  const [formValues, setFormValues] = useState(emptyForm);

  // handle changes to text fields
  function onTextChange(field, event) {

  }

  return (
    <div/>
  );
}
