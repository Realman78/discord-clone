import io from 'socket.io-client'
import { updateChatHistoryIfActive } from '../features/utils/chat'
import { setPendingFriendsInvitation, setFriends, setOnlineUsers } from '../store/actions/friendsActions'
import store from '../store/store'
import * as roomHandler from '../rtc/roomHandler'
import * as webRTCHandler from './webRTCHandler'
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

    socket.on('room-create', data => {
        roomHandler.newRoomCreated(data)
    })

    socket.on('active-rooms', data => {
        roomHandler.updateActiveRooms(data)
    })

    socket.on('conn-prepare', data => {
        const { connUserSocketId } = data
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false)
        socket.emit('conn-init', { connUserSocketId })
    })

    socket.on('conn-init', data => {
        const { connUserSocketId } = data
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true)
    })

    socket.on('room-participant-left', data => {
        console.log('user left room')
        webRTCHandler.handleParticipantLeftRoom(data)
    })
    
    socket.on('conn-signal', data => {
        const { connUserSocketId } = data
        webRTCHandler.handleSignalingData(data)
    })

}

export const sendDirectMessage = data => {
    socket.emit('direct-message', data)
}

export const getDirectChatHistory = data => {
    socket.emit('direct-chat-history', data)
}

export const createNewRoom = () => {
    socket.emit('room-create')
}

export const joinRoom = data => {
    socket.emit('room-join', data)
}

export const leaveRoom = data => {
    socket.emit('room-leave', data)
}

export const signalPeerData = data => {
    socket.emit('conn-signal', data)
}
