import React from 'react'
import { styled } from '@mui/material'
import FriendsListItem from './FriendsListItem'
import { connect } from 'react-redux'

const MainContainer = styled('div')({
    flexGrow: 1,
    width: '100%',
})

const checkOnlineUsers = (friends = [], onlineUsers = [])=>{
  friends.forEach(f=>{
    const isUserOnline = onlineUsers.find(user=>user.userId===f.id)
    f.isOnline = isUserOnline ? true : false
  })
  return friends
}

function FriendsList({friends, onlineUsers}) {
    console.log(friends)
    return (
        <MainContainer>{checkOnlineUsers(friends, onlineUsers).map(friend => <FriendsListItem username={friend.username} id={friend.id} key={friend.id} isOnline={friend.isOnline}/>)}</MainContainer>
    )
}

const mapStoreStateToProps = ({ friends }) => {
    return {
      ...friends,
    }
  };

export default connect(mapStoreStateToProps)(FriendsList)