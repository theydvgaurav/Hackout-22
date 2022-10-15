const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrescriptionSchema = new mongoose.Schema({

    PatientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    DoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors'
    },
    AttachmentsPath: {
        type: [String],
        default: []
    },
    PatientName: {
        type: String
    },
    Description: {
        type: String
    }
},
    { strictQuery: false }
)

const Prescriptions = mongoose.model('Prescriptions', PrescriptionSchema)
module.exports = Prescriptions