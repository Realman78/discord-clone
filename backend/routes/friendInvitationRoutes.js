const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { postLogin, postRegister } = require('../controllers/auth/authControllers')
const { protect } = require('../middleware/authMiddleware')
const {postInvite, postAccept, postReject} = require('../controllers/friendsInvite/friendInvitationController')

const postFriendInvitationSchema = Joi.object({
    targetMailAddress: Joi.string().email()
})

const inviteDescisionSchema = Joi.object({
    id: Joi.string().required()
})

router.post('/invite', protect, validator.body(postFriendInvitationSchema), postInvite)

router.post('/accept', protect, validator.body(inviteDescisionSchema), postAccept)

router.post('/reject', protect, validator.body(inviteDescisionSchema), postReject)

module.exports = router