/*
Style Here:
Congratulatory Message
New User information
Happy Plant Image?
*/

import React from 'react'

export default function Success(props){
    const {user} = props
    return(
        <>
        <h1>Hello {user.fName} {user.lName}</h1>
        <h2>We know everything about you, {user.fName}.</h2>
        <h3>Your phone number, {user.phone} is sharing your data.</h3>
        <h3>Your email, {user.email} is sentient and given us your password.</h3>
        <h4>{user.password}</h4>
        <h4>Nothing is true. Everything is permitted.</h4>
        </>
    )
}