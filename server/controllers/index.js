const auth = require('./auth')

module.exports = {
    registerDoc: auth.registerDoc,
    registerPatient: auth.registerPatient,
    loginDoc: auth.loginDoc
}