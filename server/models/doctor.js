const mongoose = require('mongoose');

const DcotorSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: false,
        unique: false,
        default: 'Anonymous'
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Address: {
        type: String,
        required: false,
        unique: false
    },
    Gender: {
        type: String,
        required: false,
        unique: false
    },
    Password: {
        type: String,
        required: true,
        unique: false
    },
    PhoneNo: {
        type: String,
        required: true,
        unique: false
    },
    IsActive: {
        type: Boolean,
        default: true
    }
},
    { strictQuery: false }
)


const Doctors = mongoose.model('Doctors', DcotorSchema);
module.exports = Doctors;