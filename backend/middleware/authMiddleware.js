const User = require('../models/User')
const jwt = require('jsonwebtoken')

const protect = async (req,res,next)=>{
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        console.log('no token')
        return res.status(403).send("A token is required for authentication");
    }
    try {
        token = token.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}

module.exports = {protect}