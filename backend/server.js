const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = require('./config/db')

const socketServer = require('./socket')

const PORT = process.env.PORT || 5002

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const authRouter = require('./routes/authRoutes')
const friendInvitationRouter = require('./routes/friendInvitationRoutes')

app.use('/api/auth', authRouter)
app.use('/api/friends-invitation', friendInvitationRouter)

const server = http.createServer(app)
socketServer.registerSocketServer(server)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
}).catch((e) => {
    console.log(e)
})