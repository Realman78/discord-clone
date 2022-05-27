const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const postLogin = async (req, res) => {
    try {
        const { password, mail } = req.body
        const user = await User.findOne({ mail: mail.toLowerCase() })
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                userId: user._id,
                mail,
            }, process.env.TOKEN_KEY, { expiresIn: '30d' })

            return res.status(200).json({
                userDetails: {
                    mail: user.mail,
                    token: token,
                    username: user.username,
                    _id: user._id
                },
            })
        }
        return res.status(400).send('Invalid credentials.')

    } catch (e) {
        console.log(e)
        return res.status(500).send("Error occured. Please try again.")
    }
}
module.exports = postLogin