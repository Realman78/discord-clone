const User = require('../../models/User')
const FriendInvitation = require('../../models/FriendInvitation')
const friendsUpdate = require('../../socketHandlers/updates/friends')

const postInvite = async (req, res) => {
    //console.log(req.user)
    const { targetMailAddress } = req.body
    const { userId, mail } = req.user

    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res.status(409).send('You cant friend yourself')
    }

    const targetUser = await User.findOne({ mail: targetMailAddress.toLowerCase() })
    if (!targetUser) return res.status(404).send('User has not been found')

    const invitationAlreadySent = await FriendInvitation.findOne({ senderId: userId, receiverId: targetUser._id })

    if (invitationAlreadySent) {
        return res.status(409).send('Invitation already sent')
    }
    const userAlreadyFriend = targetUser.friends.find(friendId => friendId.toString() === userId.toString())
    if (userAlreadyFriend) return res.status(409).send('User is already a friend.')

    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id
    })

    friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString())

    return res.status(201).send(newInvitation)
}

module.exports = { postInvite }