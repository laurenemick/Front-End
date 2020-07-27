import * as yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

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
    .max(320, 'Email is too long')
    .required('Email is required'),
    
    phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required("Valid Phone Number is Required"),

    password: yup
    .string()
    .matches(
        passRegExp,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .max(15, "Your password is too long")
      .required('Password is required'),

    vPassword: yup
    .string()
    .required('Passwords must match')
    .when("password", {
        is: password => (password && password.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
      })
})

export default SFormSchema