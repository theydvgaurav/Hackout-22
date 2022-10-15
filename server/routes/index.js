const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares/index')
const controllers = require('../controllers/index')

// register a doc
router.post('/register-doc', [middlewares.verifyDocEmail.checkDuplicateEmail], [controllers.registerDoc]);

// login a doc
router.post('/login-doc', [controllers.loginDoc]);

module.exports = router