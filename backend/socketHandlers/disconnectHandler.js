const serverStore = require('../socketStore')

const disconnectHandler = socket=>{
    serverStore.removeConnectedUser(socket.id)
}

module.exports = disconnectHandler