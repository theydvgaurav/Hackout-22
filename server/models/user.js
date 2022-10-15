const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({

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
        required: false,
        unique: false
    },
    PhoneNo: {
        type: String,
        required: false,
        unique: false
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    MagicLink: {
        type: String,
        required: false,
        unique: false,
    },
    MagicLinkExpired: {
        type: Boolean,
        default: false
    }
},
    { strictQuery: false }
)

const Users = mongoose.model('Users', UserSchema)
module.exports = Users