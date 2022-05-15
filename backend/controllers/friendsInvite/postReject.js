const User = require('../../models/User')
const FriendInvitation = require('../../models/FriendInvitation')
const friendsUpdate = require('../../socketHandlers/updates/friends')

const postReject = async (req, res) => {
    try{
        const { id } = req.body;
        const { userId } = req.user;
    
        // remove that invitation from friend invitations collection
        const invitationExists = await FriendInvitation.exists({ _id: id });
    
        if (invitationExists) {
          await FriendInvitation.findByIdAndDelete(id);
        }
    
        // update pending invitations
        friendsUpdate.updateFriendsPendingInvitations(userId);
    
        return res.status(200).send("Invitation succesfully rejected");
    }catch(err){
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
}

module.exports = { postReject }