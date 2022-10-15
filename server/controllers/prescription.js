require("dotenv").config();
const Presc = require("../models/prescription");
const Patient = require("../models/user");
const Doc = require("../models/doctor");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer");

const uploadFile = require('../utility/fileUpload')
const presignedURL = require('../utility/presignedUrl')

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

    if (existingUser) PatientId = existingUser.id;

    if (!existingUser) {
        const newUser = await Patient.create({
            Email: req.body.email,
            MagicLink: token,
        });
        PatientId = newUser.id;
    }

    const newPresc = new Presc({
        PatientId: PatientId,
        DoctorId: req.doc.id,
        PresignedUrl: "",
        PatientName: req.body.name,
        Description: req.body.description,
    });

    // todo send email to patient

    newPresc
        .save()
        .then((data) => {
            res.status(200).send({ message: "Documents Sent Successfully" });
        })
        .catch((error) => {
            return res.status(503).json({ message: error });
        });
};

const getAllPresc = async (req, res) => {
    try {
        const allDocs = await Presc.find({ PatientId: req.user.id }).distinct(
            "DoctorId"
        );
        const docDetails = await Doc.find()
            .where("_id")
            .in(allDocs)
            .select("Name Email Phone Email");
        res.status(200).send({ data: docDetails });
    } catch (error) {
        return res.status(503).json({ message: error });
    }
};

module.exports = { createPrescription, getAllPresc };
