const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { postLogin, postRegister } = require('../controllers/auth/authControllers')
const { protect } = require('../middleware/authMiddleware')

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
    password: Joi.string().min(6).max(48).required(),
    mail: Joi.string().email().required(),
})
const loginSchema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().min(6).max(48).required(),
})

router.post('/register', validator.body(registerSchema), postRegister)
router.post('/login', validator.body(loginSchema), postLogin)



module.exports = router