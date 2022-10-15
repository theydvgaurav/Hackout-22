const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const Schema   = mongoose.Schema

const UserSchema = new mongoose.Schema({

	Name: { 
		type     : String, 
		required : false,
		unique   : false,
		default  : 'Anonymous'
	},
	Email: { 
		type     : String, 
		required : true,
		unique   : true
	},
    Address: {
        type : Text,
        required : true,
        unique : false
    },
    Gender: {
        type : String,
        required : true,
        unique : false
    },
    Password: {
        type : String,
        required : true,
        unique : false
    },
    PhoneNo: {
        type : String,
        required : true,
        unique : false
    },
    IsActive: {
        type : Boolean,
        default : true
    }, 
	MagicLink: { 
		type     : String, 
		required : false,
		unique   : false,
		default  : uuidv4
	},
	MagicLinkExpired: { 
		type     : Boolean, 
		default  : false
	}
},
{strictQuery: false}
)

const Users = mongoose.model('Users', UserSchema)
module.exports = Users