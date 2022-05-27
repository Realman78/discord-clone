const Conversation = require('../../models/Conversation')
const serverStore = require('../../socketStore')

const updateChatHistory = async (convoId, toSpecifiedSocketId = null) => {
    const conversation = await Conversation.findById(convoId).populate({
        path: 'messages',
        model: 'Message',
        populate: {
            path: 'author',
            model: 'User',
            select: 'username _id'
        }
    })
    if (conversation){
        const io = serverStore.getSocketServerInstance()
        if (toSpecifiedSocketId){
            return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
                messages: conversation.messages,
                participants: conversation.participants
            })
        }

        conversation.participants.forEach((userId)=>{
            const activeConnections = serverStore.getActiveConnections(userId.toString())

            activeConnections.forEach((socketId)=>{
                io.to(socketId).emit('direct-chat-history', {
                    messages: conversation.messages,
                    participants: conversation.participants
                })
            })
        })
    }
}

module.exports = {
    updateChatHistory
}