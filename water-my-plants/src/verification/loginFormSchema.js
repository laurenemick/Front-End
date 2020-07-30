import * as yup from "yup";

const LFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .max(320, "Email is too long")
    .required("Email is required"),

  password: yup
    .string()
    .max(320, "Why so long?")
    .required("Password is required"),
});

export default LFormSchema