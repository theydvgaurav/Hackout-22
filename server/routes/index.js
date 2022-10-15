const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares/index')
const controllers = require('../controllers/index')

router.post('/register-doc', [middlewares.verifyDocEmail.checkDuplicateEmail], [controllers.registerDoc]);

module.exports = router