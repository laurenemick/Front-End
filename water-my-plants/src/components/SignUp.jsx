import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Map } from "immutable";

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
  verifyPassword: ""
});

// Sign up page
export default function SignUp (props) {
  const setAuthToken = {props};
  const [formValues, setFormValues] = useState(emptyForm);
  const setAuthToken = {props},
        [formValues, setFormValues] = useState(emptyForm),
        styles = styleDefinition();

  // handle changes to text fields
  function onTextChange(field, event) {

  }

  // handle form submission
  function submitForm () {

  }

  return (
    <div/>
  );
}
