const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {type: String},
    mail: {type: String, unique: true},
    password: {type: String},
    friends: [{type: mongoose.Types.ObjectId, ref: 'User'}]
})
const User = mongoose.model("User", UserSchema)
module.exports = User