const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { postLogin, postRegister } = require('../controllers/auth/authControllers')
const { protect } = require('../middleware/authMiddleware')
const {postInvite} = require('../controllers/friendsInvite/friendInvitationController')

const postFriendInvitationSchema = Joi.object({
    targetMailAddress: Joi.string().email()
})

router.post('/invite', protect, validator.body(postFriendInvitationSchema), postInvite)

module.exports = router