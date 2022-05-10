import React from 'react'
import Input from '../Input'

function RegisterInputs(props) {
    return <>
    <Input value={props.mail} setValue={props.setMail} label="E-mail" type="text" placeholder="Type your email address"/>
    <Input value={props.username} setValue={props.setUsername} label="Username" type="text" placeholder="Enter username"/>
    <Input value={props.password} setValue={props.setPassword} label="Password" type="password" placeholder="Type your password"/>
  </>
}

export default RegisterInputs