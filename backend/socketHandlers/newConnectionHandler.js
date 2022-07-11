const serverStore = require('../socketStore')
const friendsUpdates = require('../socketHandlers/updates/friends')
const roomUpdates = require('./updates/rooms')

const newConnectionHandler = async (socket, io)=>{
    const userDetails = socket.user
    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
    })
    friendsUpdates.updateFriendsPendingInvitations(userDetails.userId)
    friendsUpdates.updateFriends(userDetails.userId)

    setTimeout(()=>{
        roomUpdates.updateRooms(socket.id)
    }, 500)
}

module.exports = newConnectionHandler