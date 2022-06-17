import io from 'socket.io-client'
import { updateChatHistoryIfActive } from '../features/utils/chat'
import { setPendingFriendsInvitation, setFriends, setOnlineUsers } from '../store/actions/friendsActions'
import store from '../store/store'

let socket = null

export const connectSocket = userDetails => {
    console.log(userDetails)
    const jwtToken = userDetails.token
    socket = io('http://localhost:5002', {
        auth: {
            token: jwtToken
        }
    })

    socket.on('connect', () => {
        console.log('Connected with socket server. ID: ' + socket.id)
    })

    socket.on('friends-invitations', (data) => {
        const { pendingInvitations } = data
        store.dispatch(setPendingFriendsInvitation(pendingInvitations))
    })

    socket.on('friends-list', data => {
        const { friends } = data
        store.dispatch(setFriends(friends))
    })

    socket.on('online-users', data => {
        const { onlineUsers } = data
        store.dispatch(setOnlineUsers(onlineUsers))
    })

    socket.on('direct-chat-history', data => {
        updateChatHistoryIfActive(data)
    })
}

export const sendDirectMessage = data => {
    socket.emit('direct-message', data)
}

export const getDirectChatHistory = data => {
    socket.emit('direct-chat-history', data)
}