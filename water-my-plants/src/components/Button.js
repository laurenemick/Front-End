import React from "react";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

export default function BigButton() {
  return (
    <>
      <Button id = "signUpButton"
        style={{ color: "#210124", maxHeight: "2.5rem", alignSelf: "center" }}>
        <Link to="/registration" style={{ textDecoration: "none" }}>
          Sign Up
        </Link>
      </Button>
    </>
  );
}
