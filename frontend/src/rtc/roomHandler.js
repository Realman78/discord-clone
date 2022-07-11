import store from '../store/store'
import { setOpenRoom, setRoomDetails, setActiveRooms, setLocalStream, setRemoteStreams, setScreenSharingStream, setIsUserJoinedOnlyWithAudio } from '../store/actions/roomActions'
import * as socketConnection from './socketConnection'
import * as webRTCHandler from './webRTCHandler'

export const createNewRoom = () => {
    const successCallback = () => {
        store.dispatch(setOpenRoom(true, true))
        store.dispatch(setIsUserJoinedOnlyWithAudio(store.getState().room.audioOnly))
        socketConnection.createNewRoom()
    }
    const audioOnly = store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback)
}
export const newRoomCreated = (data) => {
    const { roomDetails } = data

    store.dispatch(setRoomDetails(roomDetails))
}
export const updateActiveRooms = data => {
    const { activeRooms } = data

    const friends = store.getState().friends.friends
    const rooms = []
    const userId = store.getState().auth.userDetails?._id

    activeRooms.forEach(room => {
        const isRoomCreatedByMe = room.roomCreator.userId === userId
        if (isRoomCreatedByMe) rooms.push({ ...room, creatorUsername: 'Me' })
        else {
            friends.forEach(fren => {
                if (fren.id === room.roomCreator.userId) {
                    rooms.push({ ...room, creatorUsername: fren.username })
                }
            })
        }
    });
    store.dispatch(setActiveRooms(rooms))
}
export const joinRoom = (roomId) => {
    const successCallback = () => {
        store.dispatch(setRoomDetails({ roomId }))
        store.dispatch(setOpenRoom(false, true))
        store.dispatch(setIsUserJoinedOnlyWithAudio(store.getState().room.audioOnly))
        socketConnection.joinRoom({ roomId })
    }
    const audioOnly = store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback)
}

export const leaveRoom = () => {
    const roomId = store.getState().room.roomDetails.roomId

    const localStream = store.getState().room.localStream
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
        store.dispatch(setLocalStream(null))
    }

    const screenSharingStream = store.getState().room.screenSharingStream
    if (screenSharingStream) {
        screenSharingStream.getTracks().forEach(t => t.stop())
        store.dispatch(setScreenSharingStream(null))
    }

    store.dispatch(setRemoteStreams([]))
    webRTCHandler.closeAllConnections()

    socketConnection.leaveRoom({ roomId })
    store.dispatch(setRoomDetails(null))
    store.dispatch(setOpenRoom(false, false))
}