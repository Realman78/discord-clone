const mongoose = require('mongoose')

const FriendInvitationSchema = mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})
const FriendInvitation = mongoose.model('FriendInvitation', FriendInvitationSchema)
module.exports = FriendInvitation