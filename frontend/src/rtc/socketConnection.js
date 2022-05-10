import io from 'socket.io-client'
import {setPendingFriendsInvitation} from '../store/actions/friendsActions'
import store from '../store/store'
let socket = null

export const connectSocket = userDetails =>{
    console.log(userDetails)
    const jwtToken = userDetails.token
    socket = io('http://localhost:5002', {
        auth: {
            token: jwtToken
        }
    })

    socket.on('connect', ()=>{
        console.log('Connected with socket server. ID: ' + socket.id)
    })

    socket.on('friends-invitations', (data)=>{
        const {pendingInvitations} = data
        console.log('Invitation came')
        console.log(pendingInvitations)
        store.dispatch(setPendingFriendsInvitation(pendingInvitations))
    })
}