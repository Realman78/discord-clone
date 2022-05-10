import * as api from '../../api'

export const friendsActions = {
    SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
    SET_PENDING_FRIENDS_INVITATIONS: 'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
    SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS',
}

export const getActions = dispatch =>{
    return {
        sendFriendInvitation: (data, closeDialogHandler)=> dispatch(sendFriendInvitation(data, closeDialogHandler)),
        acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
        rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data))
        
    }
}

export const setPendingFriendsInvitation = (pendingFriendsInvitations)=>{
    return {
        type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
        pendingFriendsInvitations
    }
}

const sendFriendInvitation = (data, closeDialogHandler)=>{
    return async(dispatch)=>{
        const response = await api.sendFriendInvitation(data)
        if (response.error){
            console.log('something went wrong')
            console.log(response.exception.response.data)
        }else{
            console.log('Invitation sent')
            console.log(response)
            closeDialogHandler()
        }
    }
}


const acceptFriendInvitation = data=>{
    return async dispatch =>{
        const response = await api.acceptFriendInvitation(data)
        if (response.error){
            console.log('something went wrong')
            console.log(response.exception?.response?.data)
        }else{
            console.log('Friended Joey Friended')
            console.log(response)
        }
    }
}
const rejectFriendInvitation = data=>{
    return async dispatch =>{
        const response = await api.rejectFriendInvitation(data)
        if (response.error){
            console.log('something went wrong')
            console.log(response.exception?.response?.data)
        }else{
            console.log('Rejected Joey Joey Friended')
            console.log(response)
        }
    }
}