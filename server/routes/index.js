const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares/index')
const controllers = require('../controllers/index')

// register a doc
router.post('/register-doc', [middlewares.verifyDocEmail.checkDuplicateEmail], [controllers.registerDoc]);

// login a doc
router.post('/login-doc', [controllers.loginDoc]);

// create a prescription
router.post('/create-presc', [middlewares.verifyDocToken.tokenValidation], [controllers.createPrescription])

// login a patient
router.post('/login-pat/:token', [controllers.loginPatientByMagicLink])

// get all docs for a patient
router.get('/get-docs', [middlewares.verifyUserToken.tokenValidation], [controllers.getAllPresc])

// login a patient
router.post('/login-pat', [controllers.loginPatient])

// update password for patient
router.post('/update-password', [middlewares.verifyUserToken.tokenValidation], [controllers.updatePassword])

module.exports = router