import React, { useEffect } from 'react'
import {styled} from '@mui/material'
import SideBar from '../components/Dashboard/SideBar'
import FriendsSideBar from '../components/Dashboard/FriendsSideBar'
import Messenger from '../components/Dashboard/Messenger/Messenger'
import AppBar from '../components/Dashboard/AppBar/AppBar'
import { logout } from '../features/utils/auth'
import { setUserDetails } from '../store/actions/authActions'
import {connect} from 'react-redux'
import { getActions } from '../store/actions/authActions'
import { connectSocket } from '../rtc/socketConnection'

const Wrapper = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
})
function Dashboard({setUserDetails}) {
  useEffect(()=>{
    const userDetails = localStorage.getItem('user')
    if (!userDetails){
      logout()
    }else{
      setUserDetails(JSON.parse(userDetails))
      connectSocket(JSON.parse(userDetails))
    }
  }, [])
  return <Wrapper>
    <SideBar /> 
    <FriendsSideBar /> 
    <Messenger /> 
    <AppBar /> 
  </Wrapper>
}

const mapActionsToProps = dispatch =>{
  return {
    ...getActions(dispatch)
  }
}

export default connect(null, mapActionsToProps)(Dashboard)