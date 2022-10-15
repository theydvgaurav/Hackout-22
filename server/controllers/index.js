const auth = require('./auth')
const presc = require('./prescription')

module.exports = {
    registerDoc: auth.registerDoc,
    loginDoc: auth.loginDoc,
    createPrescription: presc.createPrescription,
    loginPatientByMagicLink: auth.loginPatientByMagicLink,
    getAllPresc: presc.getAllPresc,
    loginPatient: auth.loginPatient,
    updatePassword: auth.updatePassword
}