const Message = require('../models/Message')
const Conversation = require('../models/Conversation')
const chatUpdates = require('../socketHandlers/updates/chats')

const directMessageHandler = async (socket, data)=>{
    try{
        const {userId} = socket.user
        const {receiverId, content} = data
        const message = await Message.create({
            author: userId,
            content,
            date: new Date(),
            type: 'DIRECT'
        })

        const conversation = await Conversation.findOne({
            participants: {$all: [userId, receiverId]}
        })
        if (conversation){
            conversation.messages.push(message._id)
            await conversation.save()

            chatUpdates.updateChatHistory(conversation._id.toString())
        }else{
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverId]
            })
            chatUpdates.updateChatHistory(newConversation._id.toString())
        }
    }catch(e){
        console.log(e)
    }
}

module.exports = directMessageHandler