import React, { useEffect, useState } from 'react'
import AuthBox from '../components/AuthBox'
import LoginHeader from '../components/Login/LoginHeader'
import LoginInputs from '../components/Login/LoginInputs'
import LoginFooter from '../components/Login/LoginFooter'
import {validateLoginForm} from '../features/utils/validators'
import {connect} from 'react-redux'
import {getActions} from '../store/actions/authActions'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'


function Login({login}) {
  const navigate = useNavigate()
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(()=>{
    setIsFormValid(validateLoginForm(mail, password))
  }, [mail, password, setIsFormValid])

  const handleLogin = async ()=>{
    const userDetails = {
      mail,
      password,
    }
    const answer = await login(userDetails, navigate)
    console.log(answer)
    if (answer.error){
      toast.error(answer.error.exception?.code === "ECONNABORTED" ? "Something went wrong. Retry Connection" : "Credentials incorrect")
    }
  }

  return <AuthBox>
    <LoginHeader />
    <LoginInputs mail={mail} setMail={setMail} password={password} setPassword={setPassword}/>
    <LoginFooter isFormValid={isFormValid} handleLogin={handleLogin}/>
  </AuthBox>
}

const mapActionsToProps = dispatch=>{
  return {
    ...getActions(dispatch)
  }
}

export default connect(null, mapActionsToProps)(Login)