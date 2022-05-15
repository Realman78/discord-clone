const serverStore = require('../socketStore')
const friendsUpdates = require('../socketHandlers/updates/friends')

const newConnectionHandler = async (socket, io)=>{
    const userDetails = socket.user
    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
    })
    friendsUpdates.updateFriendsPendingInvitations(userDetails.userId)
    friendsUpdates.updateFriends(userDetails.userId)
}

module.exports = newConnectionHandler