import React from 'react'
import {Typography} from '@mui/material'

function LoginHeader() {
  return <>
    <Typography variant='h5' sx={{color: 'white'}}>Welcome Back!</Typography>
    <Typography sx={{color: '#b9bbbe'}}>We are happy you're back</Typography>
  </>
}

export default LoginHeader