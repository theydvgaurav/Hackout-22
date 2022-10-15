require('dotenv').config();
const Presc = require('../models/prescription')
const Patient = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer");

const createPrescription = async (req, res) => {
    // todo file upload to S3 and gen presigned url


    const token = jwt.sign(
        {
            email: req.body.email,
        },
        process.env.ACCESS_TOKEN_SECRET
    );

    let PatientId;

    const existingUser = await Patient.findOne({ Email: req.body.email });

    if (existingUser) PatientId = existingUser.id

    if (!existingUser) {
        const newUser = await Patient.create(({
            Email: req.body.email,
            MagicLink: token,
        }));
        PatientId = newUser.id
    }

    const newPresc = new Presc({
        PatientId: PatientId,
        DoctorId: req.doc.id,
        PresignedUrl: "",
        PatientName: req.body.name,
        Description: req.body.description
    })

    // todo send email to patient

    newPresc.save().then(data => { res.status(200).send({ message: "Documents Sent Successfully" }) }).catch(error => {
        return res.status(503).json({ message: error })
    })
}

module.exports = { createPrescription }