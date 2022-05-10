import React from 'react'
import CustomPrimaryButton from '../CustomPrimaryButton'
import RedirectInfo from '../RedirectInfo'
import {useNavigate} from 'react-router-dom'
import {Tooltip} from '@mui/material'

const getFormNotValidMessage = ()=>{
  return 'Enter correct e-mail address and password shuold be at least 6 characters'
}
const getFormValidMessage = ()=>{
  return 'Press to register!'
}

function RegisterFooter({handleRegister, isFormValid}) {
  const navigate = useNavigate()
  const handlePushToLoginPage = ()=>{
    navigate('/login')
  }
  return <>
    <Tooltip title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>
    <div>
        <CustomPrimaryButton label="Register" additionalStyles={{marginTop:'30px'}} disabled={!isFormValid} onClick={handleRegister}/>
    </div>
    </Tooltip>
    <RedirectInfo text='Already have an account?' redirectText='Login' additionalStyles={{marginTop: '5px'}} redirectHandler={handlePushToLoginPage}/>
  </>
}

export default RegisterFooter