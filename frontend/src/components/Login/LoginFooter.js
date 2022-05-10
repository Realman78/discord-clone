import React from 'react'
import CustomPrimaryButton from '../CustomPrimaryButton'
import RedirectInfo from '../RedirectInfo'
import {useNavigate} from 'react-router-dom'
import {Tooltip} from '@mui/material'

const getFormNotValidMessage = ()=>{
  return 'Enter correct e-mail address and password shuold be at least 6 characters'
}
const getFormValidMessage = ()=>{
  return 'Press to log in!'
}

function LoginFooter({handleLogin, isFormValid}) {
  const navigate = useNavigate()
  const handlePushToRegisterPage = ()=>{
    navigate('/register')
  }
  return <>
    <Tooltip title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>
    <div>
        <CustomPrimaryButton label="Log in" additionalStyles={{marginTop:'30px'}} disabled={!isFormValid} onClick={handleLogin}/>
    </div>
    </Tooltip>
    <RedirectInfo text='Need an account?' redirectText='Create an account' additionalStyles={{marginTop: '5px'}} redirectHandler={handlePushToRegisterPage}/>
  </>
}

export default LoginFooter