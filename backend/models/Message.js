const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    content: { type: String },
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    date: { type: Date },
    type: { type: String  }
})
const Message = mongoose.model("Message", MessageSchema)
module.exports = Message