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

// get all doctors for a patient
router.get('/get-docs', [middlewares.verifyUserToken.tokenValidation], [controllers.getAllDocs])

//get all prescriptions for a patient
router.get('/get-presc', [middlewares.verifyUserToken.tokenValidation], [controllers.getAllPrescForPatient])

// get all patients for a doctor
router.get('/get-patients', [middlewares.verifyDocToken.tokenValidation], [controllers.getAllPatients])

// get all prescriptions sent for a doctor
router.get('/get-presc-doc', [middlewares.verifyDocToken.tokenValidation], [controllers.getAllPrescForDoc])

// get all prescriptions sent to a particular patient 
router.get('/get-doc-presc/:doctorId', [middlewares.verifyUserToken.tokenValidation], [controllers.getPrecsByDocId])

// get all prescriptions sent by a particular doctor
router.get('/get-pat-presc/:patientId', [middlewares.verifyDocToken.tokenValidation], [controllers.getPrecsByPatId])

// login a patient
router.post('/login-pat', [controllers.loginPatient])

// update password for patient
router.post('/update-password', [middlewares.verifyUserToken.tokenValidation], [controllers.updatePassword])

module.exports = router