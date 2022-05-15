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

const updateFriends = async userId => {
    try {
        const receiverList = serverStore.getActiveConnections(userId)
        if (receiverList < 1) return;
        const user = await User.findById(userId, { _id: 1, friends: 1 }).populate('friends', '_id username mail')
        if (user) {
            const friendsList = user.friends.map((f) => {
                return {
                    id: f._id,
                    mail: f.mail,
                    username: f.username
                }
            })

            const io = serverStore.getSocketServerInstance()
            receiverList.forEach(socketId => {
                io.to(socketId).emit('friends-list', {
                    friends: friendsList ? friendsList : []
                })
            })
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = { updateFriendsPendingInvitations, updateFriends }