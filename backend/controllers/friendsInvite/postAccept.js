const User = require('../../models/User')
const FriendInvitation = require('../../models/FriendInvitation')
const friendsUpdate = require('../../socketHandlers/updates/friends')

const postAccept = async (req, res) => {
    try{
        const {id} = req.body

        const invitation = await FriendInvitation.findById(id)
        if (!invitation) {
            return res.status(401).send('Try again, invitation not found')
        }
        const {senderId, receiverId} = invitation
        //add friends from both users
        const user1 = await User.findById(senderId)
        user1.friends = [...user1.friends, receiverId]

        const user2 = await User.findById(receiverId)
        user2.friends = [...user2.friends, senderId]

        await user1.save()
        await user2.save()

        await FriendInvitation.findByIdAndDelete(id)
        friendsUpdate.updateFriends(senderId.toString())
        friendsUpdate.updateFriends(receiverId.toString())
        friendsUpdate.updateFriendsPendingInvitations(receiverId.toString())

        return res.status(200).send('Succesfully accepted')
    }catch(err){
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
}

module.exports = { postAccept }