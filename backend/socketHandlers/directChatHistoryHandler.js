const Message = require('../models/Message')
const Conversation = require('../models/Conversation')
const chatUpdates = require('../socketHandlers/updates/chats')

const directChatHistoryHandler = async (socket, data)=>{
    try{
        const {userId} = socket.user
        const {receiverUserId} = data

        const conversation = await Conversation.findOne({
            participants: {$all: [userId, receiverUserId]},
            type: 'DIRECT'
        })
        if (conversation){
            chatUpdates.updateChatHistory(conversation._id.toString(), socket.id)
        }
       
    }catch(e){
        console.log(e)
    }
}

module.exports = directChatHistoryHandler