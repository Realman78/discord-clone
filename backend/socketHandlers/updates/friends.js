const User = require('../../models/User')
const FriendInvitation = require('../../models/FriendInvitation')
const serverStore = require('../../socketStore')

const updateFriendsPendingInvitations = async (userId) => {
    try {
        const pendingInvitations = await FriendInvitation.find({ receiverId: userId }).populate('senderId', '_id username mail')

        const receiverList = serverStore.getActiveConnections(userId)

        const io = serverStore.getSocketServerInstance()
        
        receiverList.forEach(socketId => {
            io.to(socketId).emit('friends-invitations', { pendingInvitations: pendingInvitations ? pendingInvitations : [] })
        })

    } catch (e) {
        console.log(e)
    }
}

module.exports = { updateFriendsPendingInvitations }