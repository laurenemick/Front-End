import * as yup from 'yup'
import "yup-phone"

const SFormSchema = yup.object().shape({
    fName: yup
    .string()
    .min(3, 'First name must be at least three characters')
    .required('First name is required'),

    lName: yup
    .string()
    .min(3, 'Last name must be at least three characters')
    .required('Last name is required'),

    email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
    
    phone: yup
    .string()
    .phone("IN", true)
    .required("Valid Phone Number is Required"),

    password: yup
    .string()
    .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){2})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and two special case character"
      )
      .required('Password is required'),

    vPassword: yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Passwords must match')


})