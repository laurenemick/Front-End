import * as yup from 'yup'
import "yup-phone"

const SFormSchema = yup.object().shape({
    fName: yup
    .string()
    .min(3, 'First name must be at least three characters')
    .max(15, 'Name is too long')
    .required('First name is required'),

    lName: yup
    .string()
    .min(3, 'Last name must be at least three characters')
    .max(15, 'Name is too long')
    .required('Last name is required'),

    email: yup
    .string()
    .email('Email must be valid')
    .max(20, 'Email is too long')
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
      .max(15, "Your password is too long")
      .required('Password is required'),

    vPassword: yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Passwords must match')
})

const LFormSchema = yup.object().shape({
    email: yup
    .string()
    .email('Must be a valid email address')
    .max(20, 'Your email is quite long')
    .required('Email is required'),

    password: yup
    .string()
    .max(15, 'Password is too long')
    .required('Password is required')
})