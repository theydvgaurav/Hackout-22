require('dotenv').config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Patient = require('../models/user')
const Doc = require('../models/doctor')
const nodemailer = require('../config/nodemailer')

const registerPatient = async (email) => {
    const newUser = new Patient({
        Email: email,
        MagicLink: uuidv4()
    });
    newUser.save().then(
        data => {
            // nodemailer.sendConfirmationEmail(
            //     userRegister.name,
            //     userRegister.email,
            //     userRegister.confirmationCode
            // );

            return res.status(200).send({
                message: "User Created Successfully"
            });
        })
        .catch(error => {
            return res.status(503).json(error)
        })
}

const registerDoc = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const newDoc = new Doc({
        Name: req.body.name,
        Email: req.body.email,
        PhoneNo: req.body.phone,
        Password: password,
    })

    newDoc.save().then(
        data => {
            const token = jwt.sign(
                {
                    id: data._id,
                    email: data.Email
                },
                process.env.ACCESS_TOKEN_SECRET
            )

            return res.status(200).send({
                id: data._id, token: token, email: data.Email, name: data.Name
            });
        }
    )
        .catch(error => {
            return res.status(503).json(error)
        })
}

module.exports = { registerDoc, registerPatient }