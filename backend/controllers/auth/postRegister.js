const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const postRegister = async (req, res) => {
    try {
        console.log(process.env.JWT_SECRET)
        const { username, password, mail } = req.body
        const userExists = await User.exists({ mail: mail.toLowerCase() })
        if (userExists) {
            return res.status(409).send('email already in use')
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const userBody = {
            username, password: encryptedPassword, mail: mail.toLowerCase()
        }
        const user = await User.create(userBody)
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, { expiresIn: '30d' })

        res.status(201).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: user.username,
            },
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send("Error occured. Please try again.")
    }
}
module.exports = postRegister