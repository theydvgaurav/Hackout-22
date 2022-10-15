const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const PrescriptionSchema = new mongoose.Schema({

    PatientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'
    },
    DoctorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctors'
    },
    PresignedUrl : {
        type : [String],
        default : []
    }
},
{strictQuery: false}
)

const Prescriptions = mongoose.model('Prescriptions', PrescriptionSchema)
module.exports = Prescriptions