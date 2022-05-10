import React from 'react'
import { styled } from '@mui/material'
import FriendsListItem from './FriendsListItem'

const DUMMY_FRIENDS = [
    {
        id: '1',
        username: 'Mark',
        isOnline: true
    },
    {
        id: '2',
        username: 'Marin',
        isOnline: false
    },
    {
        id: '3',
        username: 'Lionel',
        isOnline: true
    },
    {
        id: '4',
        username: 'Kristijan',
        isOnline: false
    },
]

const MainContainer = styled('div')({
    flexGrow: 1,
    width: '100%',
})

function FriendsList() {
    return (
        <MainContainer>{DUMMY_FRIENDS.map(friend => <FriendsListItem username={friend.username} id={friend.id} key={friend.id} isOnline={friend.isOnline}/>)}</MainContainer>
    )
}

export default FriendsList