const serverStore = require('../socketStore')
const friendsUpdates = require('../socketHandlers/updates/friends')

const newConnectionHandler = async (socket, io)=>{
    const userDetails = socket.user
    console.log(userDetails)
    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId
    })
    friendsUpdates.updateFriendsPendingInvitations(userDetails.userId)
}

module.exports = newConnectionHandler