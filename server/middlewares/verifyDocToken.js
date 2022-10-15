require('dotenv').config();
const jwt = require('jsonwebtoken')
const User = require('../models/doctor')


tokenValidation = async (req, res, next) => {
    if (!req.headers.authorization) return res.sendStatus(401)
    token = req.headers.authorization.split(" ")[1] || req.headers['authorization'];
    if (!token.length) return res.sendStatus(401)
    const doc = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const currentDoc = await User.findById(doc.id)
    req.doc = currentDoc
    next();
}

const verifyToken = { tokenValidation }

module.exports = verifyToken 