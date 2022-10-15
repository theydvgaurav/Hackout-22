const auth = require('./auth')
const presc = require('./prescription')

module.exports = {
    registerDoc: auth.registerDoc,
    loginDoc: auth.loginDoc,
    createPrescription: presc.createPrescription,
    loginPatientByMagicLink: auth.loginPatientByMagicLink,
    getAllPrescForPatient: presc.getAllPrescForPatient,
    loginPatient: auth.loginPatient,
    updatePassword: auth.updatePassword,
    getAllDocs: presc.getAllDocs,
    getAllPrescForDoc: presc.getAllPrescForDoc,
    getAllPatients: presc.getAllPatients,
    getPrecsByDocId: presc.getPrecsByDocId,
    getPrecsByPatId: presc.getPrecsByPatId
}