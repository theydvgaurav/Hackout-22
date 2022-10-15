const mongoose = require('mongoose');

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
    RoleType:{
        type : Number,
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


const Doctors = mongoose.model('Doctors', DoctorSchema);
module.exports = Doctors ;