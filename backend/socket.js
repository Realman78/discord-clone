const authSocket = require('./middleware/authSocket')
const newConnectionHandler = require('./socketHandlers/newConnectionHandler')
const disconnectHandler = require('./socketHandlers/disconnectHandler')
const socketStore = require('./socketStore')
const directMessageHandler = require('./socketHandlers/directMessageHandler')
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler')

const registerSocketServer = server=>{
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    })
    socketStore.setSocketServerInstance(io)
    io.use((socket, next)=>{
        authSocket(socket, next)
    })

    const emitOnlineUsers = ()=>{
        const onlineUsers = socketStore.getOnlineUsers()
        io.emit('online-users', {onlineUsers})
    }

    io.on('connection', socket=>{
        console.log('user connected')
        newConnectionHandler(socket, io)
        emitOnlineUsers()

        socket.on('direct-message', (data)=>{
            directMessageHandler(socket, data)
        })
        socket.on('direct-chat-history', (data)=>{
            directChatHistoryHandler(socket,data)
        })

        socket.on('disconnect', ()=>{
            disconnectHandler(socket)
        })
    })

    setInterval(()=>{
        emitOnlineUsers()
    }, 8000)
}



module.exports = {
    registerSocketServer
}