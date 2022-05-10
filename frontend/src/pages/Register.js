import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AuthBox from '../components/AuthBox'
import RegisterFooter from '../components/Register/RegisterFooter'
import RegisterInputs from '../components/Register/RegisterInputs'
import {validateRegisterForm} from '../features/utils/validators'
import {connect} from 'react-redux'
import {getActions} from '../store/actions/authActions'
import {useNavigate} from 'react-router-dom'

function Register({register}) {
  const navigate = useNavigate()

  const [mail, setMail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isFormValid, setIsFormValid] = useState(true)

  const handleRegister = () => {
    const userDetails = {
      mail, password, username
    }

    register(userDetails, navigate)
  }

  useEffect(()=>{
    setIsFormValid(validateRegisterForm(mail, password, username))
  }, [mail, password, username, setIsFormValid])
  return <AuthBox>
    <Typography variant="h5" sx={{ color: 'white' }}>
      Create an account
    </Typography>
    <RegisterInputs mail={mail} setMail={setMail} password={password} setPassword={setPassword} username={username} setUsername={setUsername} />
    <RegisterFooter isFormValid={isFormValid} handleRegister={handleRegister}/>
  </AuthBox>
}

const mapActionsToProps = dispatch=>{
  return {
    ...getActions(dispatch)
  }
}

export default connect(null, mapActionsToProps)(Register)