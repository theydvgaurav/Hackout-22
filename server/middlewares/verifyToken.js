require('dotenv').config();
const jwt = require('jsonwebtoken')


tokenValidation = async (req, res, next) => {
    if (!req.headers.authorization) return res.sendStatus(401)
    token = req.headers.authorization.split(" ")[1] || req.headers['authorization'];
    if (!token.length) return res.sendStatus(401)
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = currentUser
    next();
}

const verifyToken = { tokenValidation }

module.exports = verifyToken 