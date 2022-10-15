const auth = require('./auth')
const presc = require('./prescription')

module.exports = {
    registerDoc: auth.registerDoc,
    loginDoc: auth.loginDoc,
    createPrescription: presc.createPrescription
}